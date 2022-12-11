import {
  BELOW_CENTER_ANCHOR,
  createHoverModeContext,
  Typography,
  useHoverMode,
  useHoverModeProvider,
} from "@react-md/core";
import { DialogContent, FixedDialog } from "@react-md/dialog";
import { Link } from "@react-md/link";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useId, useRef } from "react";

const context = createContext(createHoverModeContext());
const { Provider } = context;

interface WikipediaPreviewLinkProps {
  /**
   * The wikipedia URL
   */
  href: string;

  /**
   * The content to display in the preview window.
   */
  preview: ReactNode;

  /**
   * The link contents.
   */
  children: ReactNode;
}

function WikipediaPreviewLink({
  href,
  preview,
  children,
}: WikipediaPreviewLinkProps): ReactElement {
  const id = useId();
  const hoverMode = useContext(context);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { visible, setVisible, startShowFlow, startHideFlow } =
    useHoverMode(hoverMode);

  return (
    <>
      <Link
        ref={linkRef}
        href={href}
        onMouseEnter={startShowFlow}
        onMouseLeave={startHideFlow}
      >
        {children}
      </Link>
      <FixedDialog
        aria-label="Wikipedia Preview"
        id={id}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        onMouseEnter={startShowFlow}
        onMouseLeave={startHideFlow}
        fixedTo={linkRef}
        onClick={() => {
          window.location.href = href;
        }}
        anchor={BELOW_CENTER_ANCHOR}
        options={{ preventOverlap: true }}
        disableOverlay
        disableScrollLock
        isFocusTypeDisabled={() => true}
        style={{
          cursor: "pointer",
          maxHeight: "10rem",
          maxWidth: "20rem",
          overflow: "hidden",
        }}
      >
        <DialogContent>{preview}</DialogContent>
      </FixedDialog>
    </>
  );
}

function DesignLanguageDescription(): ReactElement {
  return (
    <Typography>
      A <strong>design language</strong> or <strong>design vocabulary</strong>{" "}
      is an overarching scheme or style that guides the design of a complement
      of products or architectural settings.
    </Typography>
  );
}

function GoogleNowDescription(): ReactElement {
  return (
    <Typography>
      <strong>Google Now</strong> was a feature of Google Search of the Google
      app for Android and iOS. Google Now proactively delivered information to
      users to predict (based on search habits and other factors) information
      they may need in the form of informational cards. Google Now branding is
      no longer used, but the functionality continues in the Google app and its
      feed.
    </Typography>
  );
}

export function SimpleExample(): ReactElement {
  const context = useHoverModeProvider({
    hoverTimeout: 1000,
    leaveTimeout: 0,
    disableTimeout: 3000,
  });
  return (
    <Provider value={context}>
      <Typography>
        {/* copy/pasted from https://en.wikipedia.org/wiki/Material_Design */}
        <strong>Material Design</strong> (codenamed{" "}
        <strong>Quantum Paper</strong>){" "}
        <WikipediaPreviewLink
          href="https://en.wikipedia.org/wiki/Design_language"
          preview={<DesignLanguageDescription />}
        >
          Design Language
        </WikipediaPreviewLink>{" "}
        {'"card" motifs that debuted in '}
        <WikipediaPreviewLink
          href="https://en.wikipedia.org/wiki/Google_Now"
          preview={<GoogleNowDescription />}
        >
          Google Now
        </WikipediaPreviewLink>{" "}
        , Material Design uses more grid-based layouts, responsive animations
        and transitions, padding, and depth effects such as lighting and
        shadows. Google announced Material Design on June 25, 2014, at the 2014
        Google I/O conference.
      </Typography>
    </Provider>
  );
}
