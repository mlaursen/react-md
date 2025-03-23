import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle"
import { Button } from "@react-md/core/button/Button"
import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar"
import { LayoutNav } from "@react-md/core/layout/LayoutNav"
import { Main } from "@react-md/core/layout/Main"
import { useExpandableLayout } from "@react-md/core/layout/useExpandableLayout"
import { Sheet } from "@react-md/core/sheet/Sheet"
import { MainNavigation } from "./MainNavigation.jsx"

export function RootLayout({ children }) {
  const {
    temporary,
    appBarProps,
    expandableNavProps,
    mainProps,
    navToggleProps,
    temporaryNavProps,
  } = useExpandableLayout({
    pathname: '/',
    defaultExpanded: true,
  })

  return <>
    <LayoutAppBar {...appBarProps}>
      <Button {...navToggleProps} />
      <AppBarTitle>react-md with vite</AppBarTitle>
    </LayoutAppBar>
    {!temporary && (
      <LayoutNav {...expandableNavProps}>
        <MainNavigation />
      </LayoutNav>
    )}
    {temporary && (
      <Sheet {...temporaryNavProps}>
        <MainNavigation />
      </Sheet>
    )}
    <Main {...mainProps}>
      {children}
    </Main>
  </>
}
