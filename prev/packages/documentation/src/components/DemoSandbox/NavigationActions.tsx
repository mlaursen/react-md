import type { ReactElement } from "react";
import { useRouter } from "next/router";
import AppBarAction from "components/AppBarAction";
import { useJs, CodePreferenceToggle } from "components/CodePreference";

export interface NavigationActionsProps {
  from: string;
  onRequestClose(): void;
}

export default function NavigationActions({
  from,
  onRequestClose,
}: NavigationActionsProps): ReactElement {
  const router = useRouter();
  const isJs = useJs();
  const language = isJs ? "js" : "ts";
  return (
    <>
      <CodePreferenceToggle
        id="sandbox"
        as="action"
        first
        onClick={(event) => {
          event.stopPropagation();

          const from = `.${language}`;
          const to = `.${isJs ? "ts" : "js"}`;
          const nextUrl = router.asPath.replace(from, to);
          router.replace(nextUrl);
        }}
      />
      <AppBarAction
        id="sandbox-dialog-close"
        last
        buttonType="text"
        onClick={onRequestClose}
      >
        {from ? "Go Back" : "Close"}
      </AppBarAction>
    </>
  );
}
