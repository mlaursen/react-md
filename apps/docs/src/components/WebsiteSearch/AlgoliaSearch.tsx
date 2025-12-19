import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { noopAutocompleteFilter } from "@react-md/core/autocomplete/defaults";
import { Form } from "@react-md/core/form/Form";
import { OptGroup } from "@react-md/core/form/OptGroup";
import { HighlightText } from "@react-md/core/typography/HighlightText";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import ColorLensIcon from "@react-md/material-icons/ColorLensIcon";
import FindInPageIcon from "@react-md/material-icons/FindInPageIcon";
import SearchIcon from "@react-md/material-icons/SearchIcon";
import { cnb } from "cnbuilder";
import {
  Fragment,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import styles from "./AlgoliaSearch.module.scss";
import { LinkOption } from "./LinkOption.js";
import { NoSearchResults } from "./NoSearchResults.js";
import { useAlgoliaSearch } from "./useAlgoliaSearch.js";

const EMPTY_LIST: readonly string[] = [];

export interface AlgoliaSearchProps {
  hide: () => void;
  unsearched: ReactNode;
}

export function AlgoliaSearch({
  hide,
  unsearched,
}: Readonly<AlgoliaSearchProps>): ReactElement {
  const { options, isNoResults, resetOrHide, ...autocompleteProps } =
    useAlgoliaSearch({
      hide,
    });
  const { query, loading } = autocompleteProps;
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    formRef.current?.scrollTo(0, 0);
  }, [query]);

  return (
    <Form
      ref={formRef}
      className={styles.container}
      onReset={resetOrHide}
      onClick={(event) => {
        // make it so clicking on any of the `unsearched` children links, the
        // dialog closes
        if (
          event.target instanceof HTMLElement &&
          event.target.closest("a[href]")
        ) {
          hide();
        }
      }}
    >
      <>
        <Autocomplete
          {...autocompleteProps}
          aria-label="Search"
          listboxLabel="Search"
          placeholder="What are you looking for?"
          autoFocus
          type="search"
          options={EMPTY_LIST}
          onKeyDown={(event) => {
            if (event.key !== "Escape") {
              return;
            }

            resetOrHide();
          }}
          maxLength={64}
          leftAddon={<SearchIcon />}
          filter={noopAutocompleteFilter}
          noOptionsChildren={null}
          listboxProps={{
            className: cnb(
              (!query || (options.length === 0 && !loading)) &&
                DISPLAY_NONE_CLASS
            ),
            disablePortal: true,
            disableSwapping: true,
            disableTransition: true,
            disableElevation: true,
            disableFixedPositioning: true,
          }}
          clearButtonProps={{
            "aria-label": query ? "Close" : "Reset",
            type: "reset",
            themeType: "outline",
            buttonType: "text",
            className: styles.escape,
            children: <kbd>esc</kbd>,
          }}
          clearButtonVisibility="always"
          disableDropdownButton
        >
          {options.map(([label, items]) => (
            <OptGroup key={label} label={label}>
              {items.map((item) => {
                const {
                  objectID,
                  docType,
                  name,
                  url,
                  pathname,
                  headings,
                  description,
                } = item;
                const href = pathname || url;
                const lastIndex = headings.length - 1;
                const highlightedName = (
                  <HighlightText query={query}>{name}</HighlightText>
                );
                let leftAddon = <FindInPageIcon />;
                if (docType === "Sassdoc") {
                  leftAddon = <ColorLensIcon />;
                }
                return (
                  <Fragment key={objectID}>
                    <LinkOption
                      href={href}
                      onClick={hide}
                      leftAddon={leftAddon}
                      secondaryText={
                        <HighlightText query={query}>
                          {description}
                        </HighlightText>
                      }
                    >
                      {highlightedName}
                    </LinkOption>
                    {headings.map((heading, i) => {
                      const {
                        id,
                        title,
                        description,
                        highlightTitle,
                        highlightDescription,
                      } = heading;

                      const value =
                        highlightTitle || !highlightDescription
                          ? title
                          : description;

                      return (
                        <LinkOption
                          key={id}
                          href={`${href}#${id}`}
                          onClick={hide}
                          secondaryText={highlightedName}
                          isHeading
                          isLastHeading={i === lastIndex}
                        >
                          <HighlightText query={query}>{value}</HighlightText>
                        </LinkOption>
                      );
                    })}
                  </Fragment>
                );
              })}
            </OptGroup>
          ))}
        </Autocomplete>
        {!query && unsearched}
        {isNoResults && <NoSearchResults query={query} />}
      </>
    </Form>
  );
}
