import React, { FunctionComponent, useState, Fragment } from "react";
import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { Overlay } from "@react-md/overlay";
import { Text } from "@react-md/typography";

import "./fixing-overflow-issues.scss";
import useToggle from "./useToggle";

const FixingOverflowIssues: FunctionComponent = () => {
  const { visible, hide, toggle } = useToggle();
  const [portal, setPortal] = useState(false);
  return (
    <Fragment>
      <AppBar theme="default">
        <AppBarTitle>
          <TextIconSpacing
            icon={
              <input
                id="enable-portal"
                type="checkbox"
                checked={portal}
                onChange={event => setPortal(event.currentTarget.checked)}
              />
            }
            iconAfter
          >
            <label htmlFor="enable-portal">Enable Portal</label>
          </TextIconSpacing>
        </AppBarTitle>
      </AppBar>
      <div className="overlay-overflow-container">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
          eros in augue fermentum tempus. Aliquam ullamcorper ullamcorper
          bibendum. Etiam finibus, ante a mattis semper, quam orci porttitor
          ante, quis imperdiet felis urna quis ipsum. Curabitur fringilla
          iaculis tellus eu pharetra. Donec fringilla nisl eu metus tempus
          viverra. Morbi commodo lobortis magna. Vivamus dictum commodo
          condimentum. Nullam molestie urna est, in fermentum ipsum tincidunt
          at. Etiam lectus nunc, lacinia in mollis non, cursus eget lacus. Donec
          cursus, neque eget auctor pretium, felis nisi semper mi, elementum
          vehicula libero lectus et felis. Cras magna orci, pellentesque non
          lectus at, luctus rhoncus lorem. Nam varius eleifend eros non mollis.
        </Text>
        <Button
          id="fixing-overflow-button"
          theme="secondary"
          themeType="outline"
          onClick={toggle}
        >
          Show Overlay
        </Button>
        <div className="fixing-overflow-fixed-container">
          <Overlay
            id="fixing-overflow-overlay"
            visible={visible}
            onRequestClose={hide}
            portal={portal}
          />
        </div>
        <Text>
          Vestibulum at feugiat eros. Maecenas commodo sapien quis dignissim
          elementum. Duis id magna sit amet purus tempus luctus eleifend eget
          risus. Duis efficitur orci ut est luctus, eu molestie velit sagittis.
          Duis faucibus varius fringilla. Vestibulum congue tempor felis
          placerat gravida. Cras id est purus.
        </Text>
      </div>
    </Fragment>
  );
};

export default FixingOverflowIssues;
