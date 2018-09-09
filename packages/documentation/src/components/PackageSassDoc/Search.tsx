import * as React from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { Button } from "@react-md/button";
import { List, ListItem, ListItemLink } from "@react-md/list";
import { Sheet } from "@react-md/sheet";
import { SearchSVGIcon } from "@react-md/material-icons";

import { IFlattenedSassDoc, ISassDoc } from "types/sassdoc";

import "./search.scss";

export interface ISassDocSearchable {
  name: string;
  type: string;
  description: string;
}

export interface ISearchProps {
  sassdoc: IFlattenedSassDoc;
}

export interface ISearchState {
  selected: number;
  searchValue: string;
  searching: boolean;
  results: ISassDocSearchable[];
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
  private fuse: Fuse;
  private list: ISassDocSearchable[];
  constructor(props: ISearchProps) {
    super(props);

    const { functions, mixins, variables } = props.sassdoc;
    this.list = variables
      .map(({ name, description }) => ({ name, description, type: "Variable" }))
      .concat(functions.map(({ name, description }) => ({ name, description, type: "Function" })))
      .concat(mixins.map(({ name, description }) => ({ name, description, type: "Mixin" })));
    this.fuse = new Fuse(this.list, {
      keys: [{ name: "name", weight: 0.8 }, { name: "type", weight: 0.1 }, { name: "description", weight: 0.1 }],
    });
    this.state = { searching: false, searchValue: "", results: this.list, selected: 0 };
  }

  public componentDidUpdate(prevProps: ISearchProps, prevState: ISearchState) {
    if (this.state.selected !== prevState.selected) {
      const padding = 8;
      window.requestAnimationFrame(() => {
        const container = document.getElementById("sassdoc-search-results-container") as HTMLDivElement;
        if (!container) {
          return;
        }

        const selected = container.querySelector(".rmd-states--selected") as HTMLLIElement;
        if (!selected) {
          return;
        }

        const position = container.scrollTop + container.offsetHeight;
        const selectedTop = selected.offsetTop;
        const selectedBottom = selectedTop + selected.offsetHeight;
        if (position < selectedBottom) {
          container.scrollTop = selectedBottom - container.offsetHeight + padding;
        } else if (container.scrollTop > selectedTop) {
          container.scrollTop = selectedTop - padding;
        }
      });
    }
  }

  public render() {
    const { selected, searching, results, searchValue } = this.state;
    return (
      <React.Fragment>
        <Button
          id="sassdoc-search-toggle"
          className="sassdoc__search-btn"
          btnType="icon"
          theme="secondary"
          themeType="contained"
          onClick={this.toggle}
        >
          <SearchSVGIcon />
        </Button>
        <Sheet
          id="sassdoc-search-results-container"
          className="sassdoc__search-container sassdoc__search-container--results"
          position="calculated"
          visible={searching}
          onRequestClose={this.close}
          overlay={false}
        >
          <List id="sassdoc-search-results" role="listbox" ordered={true} onClick={this.handleListboxClick}>
            {results.map(({ name, type }, i) => (
              <ListItemLink
                key={`${name}-${type}`}
                selected={i === selected}
                component={Link}
                to={`#${type.toLowerCase()}-${name}`}
                tabIndex={-1}
                primaryText={name}
                secondaryText={type}
              />
            ))}
            {!results.length && <ListItem primaryText="No results..." clickable={false} />}
          </List>
        </Sheet>
        <Sheet
          id="sassdoc-search-container"
          aria-label="Search for SassDoc within the page"
          className="sassdoc__search-container"
          position="calculated"
          visible={searching}
          onRequestClose={this.close}
          aria-owns="sassdoc-search-results"
          aria-expanded="true"
          aria-haspopup="listbox"
          role="combobox"
        >
          <input
            id="sassdoc-search"
            value={searchValue}
            onChange={this.search}
            type="search"
            className="sassdoc__search"
            placeholder="Search"
            aria-autocomplete="none"
            aria-controls="sassdoc-search-results"
            ref={input => {
              if (input) {
                input.focus();
              }
            }}
            onKeyDown={this.handleKeyDown}
          />
        </Sheet>
      </React.Fragment>
    );
  }

  private search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState({ results: value ? this.fuse.search(value) : this.list, selected: 0, searchValue: value });
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    switch (event.key) {
      case "Enter":
        this.navigate();
        break;
      case "ArrowUp":
      case "ArrowDown":
        this.updateSelected(event.key === "ArrowDown");
        break;
      case "Escape":
        if (!this.state.searchValue) {
          this.close();
        }
    }
  };

  private updateSelected = (increment: boolean) => {
    this.setState({
      selected: Math.max(0, Math.min(this.state.selected + (increment ? 1 : -1), this.state.results.length - 1)),
    });
  };

  private handleListboxClick = (event: React.MouseEvent<HTMLOListElement>) => {
    if (event.currentTarget !== event.target) {
      this.setState({ searching: false });
    }
  };

  private navigate = () => {
    const selected = document.querySelector("#sassdoc-search-results .rmd-states--selected") as HTMLLIElement;
    if (!selected) {
      return;
    }

    selected.click();
    this.setState({ searching: false });
  };

  private close = () => {
    this.setState({ searching: false }, () => {
      window.requestAnimationFrame(() => {
        const toggle = document.getElementById("sassdoc-search-toggle") as HTMLButtonElement;
        if (toggle) {
          toggle.focus();
        }
      });
    });
  };

  private toggle = () => {
    this.setState({ searching: !this.state.searching });
  };
}
