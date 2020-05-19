import { ReactNode } from "react";
import { PhoneConfiguration } from "components/Phone/Phone";
import { ConditionalFullPageDialogProps } from "components/ConditionalFullPageDialog";

export interface DemoOptions {
  /**
   * Boolean if the demo should be "emulated" in the fake phone on desktop
   * devices. If this prop is enabled, it will always enable the `mobileFullPage`
   * prop.
   */
  emulated?: boolean | PhoneConfiguration;

  /**
   * Boolean if the demo should no longer be wrapped in the `Card`
   * component to help highlight the demo from the rest of the page's
   * content. This should _really_ only be enabled for the card demos.
   */
  disableCard?: boolean;

  /**
   * Boolean if the demo should require a full page modal to be
   * displayed. This will automatically replace the card's content
   * with a button to show the demo.
   */
  fullPage?: boolean;

  /**
   * Boolean if the full page modal should include a floating action
   * button by default that closes the modal.
   */
  fullPageFAB?: boolean;

  fullPageProps?: Omit<
    ConditionalFullPageDialogProps,
    "id" | "children" | "enable" | "disable" | "visible"
  >;

  /**
   * Boolean if only phones should be forced into a full page modal.
   */
  phoneFullPage?: boolean;

  /**
   * Boolean if all mobile devices should be forced into a full page
   * modal. Note: a "mobile" device also includes landscape tablets.
   */
  mobileFullPage?: boolean;

  /**
   * Boolean if the full page modal should no longer have an app bar
   * element. When this is disabled, you'll most likely want to enable
   * the `fullPageFAB` prop so the modal can be closed.
   */
  disableFullPageAppBar?: boolean;

  /**
   * Boolean if the full page modal should no longer wrap the `children`
   * in the `DialogContent` component.
   */
  disableFullPageContent?: boolean;
}

export interface DemoConfig extends DemoOptions {
  /**
   * The name to use for the demo. Once I re-implement searching
   * in the documentation site, this will be how the demo can
   * be found.
   */
  name: string;

  /**
   * The description for the demo. Once I re-implement searching
   * in the documentation site, this will be used as meta-data for
   * the search behavior.
   */
  description: string;

  /**
   * The renderable children for the demo. This is what will be
   * displayed to the user in the card, phone, full page modal,
   * or inline depending on the other flags.
   */
  children: ReactNode;
}

export interface DemoProps extends DemoConfig {
  id: string;
  index: number;
  packageName: string;
}

export interface DemoPageConfig extends DemoOptions {
  /**
   * An optional description to display before the first demo
   * on the page. This is useful for background information or
   * other setup required for the package.
   */
  description?: string;

  /**
   * The demos to display on the page.
   */
  demos: DemoConfig[];

  /**
   * Any additional fonts that should be loaded for this page.
   * This is where you'll add "Material Icons" or other fonts
   * if it's required for this page.
   */
  fonts?: string[];

  /**
   * An optional className to apply to the entire DemoPage. This should
   * really only be used if some of the css variables need to be reset
   * for demo purposes.
   */
  className?: string;
}
