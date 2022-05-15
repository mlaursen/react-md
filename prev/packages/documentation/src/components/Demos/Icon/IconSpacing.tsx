import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextIconSpacing } from "@react-md/icon";
import { CloseSVGIcon, HomeSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";

import styles from "./IconSpacing.module.scss";

function CustomIcon(): ReactElement {
  return <HomeSVGIcon />;
}

export default function IconSpacing(): ReactElement {
  return (
    <>
      <Typography type="headline-5">Within buttons</Typography>
      <Button id="icon-button-1" className={styles.button}>
        <TextIconSpacing icon={<HomeSVGIcon />}>Button</TextIconSpacing>
      </Button>
      <Button
        id="icon-button-2"
        className={styles.button}
        themeType="outline"
        theme="secondary"
      >
        <TextIconSpacing icon={<HomeSVGIcon />} iconAfter>
          Button
        </TextIconSpacing>
      </Button>
      <Button
        id="icon-button-3"
        className={styles.button}
        themeType="contained"
        theme="warning"
      >
        <TextIconSpacing icon={<HomeSVGIcon />}>
          <TextIconSpacing icon={<CloseSVGIcon />} iconAfter>
            Multiple
          </TextIconSpacing>
        </TextIconSpacing>
      </Button>
      <Typography type="headline-5">Normal usage</Typography>
      <ul className={styles.list}>
        <li>
          <TextIconSpacing icon={<HomeSVGIcon />}>Icon Before</TextIconSpacing>
        </li>
        <li>
          <TextIconSpacing icon={<HomeSVGIcon />} iconAfter>
            Icon After
          </TextIconSpacing>
        </li>
        <li>
          <TextIconSpacing icon={<HomeSVGIcon />}>
            <TextIconSpacing icon={<CloseSVGIcon />} iconAfter>
              Multiple
            </TextIconSpacing>
          </TextIconSpacing>
        </li>
        <Divider />
        <li>
          <TextIconSpacing icon={<CustomIcon />}>
            Broken Custom Icon
          </TextIconSpacing>
        </li>
        <li>
          <TextIconSpacing icon={<CustomIcon />} forceIconWrap>
            Fixed Custom Icon
          </TextIconSpacing>
        </li>
        <li>
          <TextIconSpacing icon="*" forceIconWrap>
            Using an asterisk &quot;icon&quot;
          </TextIconSpacing>
        </li>
        <li>
          <TextIconSpacing icon="*" forceIconWrap iconAfter>
            Using an asterisk &quot;icon&quot;
          </TextIconSpacing>
        </li>
      </ul>
    </>
  );
}
