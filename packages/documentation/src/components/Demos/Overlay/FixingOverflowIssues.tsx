import React, { FC } from "react";
import { AppBar } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { Checkbox, useChecked } from "@react-md/form";
import { Overlay } from "@react-md/overlay";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

import styles from "./FixingOverflowIssues.module.scss";

const FixingOverflowIssues: FC = () => {
  const [visible, , disable, toggle] = useToggle(false);
  const [portal, handlePortalChange] = useChecked(false);
  return (
    <>
      <AppBar theme="default">
        <Checkbox
          id="enable-portal"
          name="portalOptions"
          checked={portal}
          onChange={handlePortalChange}
          label="Enable Portal"
        />
      </AppBar>
      <div className={styles.container}>
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
        <div className={styles.fixed}>
          <Overlay
            id="fixing-overflow-overlay"
            visible={visible}
            onRequestClose={disable}
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
    </>
  );
};

export default FixingOverflowIssues;
