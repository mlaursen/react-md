import {
  type API,
  type Collection,
  type FileInfo,
  type Identifier,
  type JSCodeshift,
  type NumericLiteral,
  type ObjectProperty,
  type Options,
} from "jscodeshift";

import {
  type ExpressionKind,
  type JSXAttributes,
  type PatternKind,
} from "../../../types.js";
import { addFileComments } from "../../utils/addFileComment.js";
import { addImportSpecifiers } from "../../utils/addImportSpecifiers.js";
import { createConst } from "../../utils/createConst.js";
import { createDestructuredConst } from "../../utils/createDestructuredConst.js";
import { createJsxAttributeFromBoolean } from "../../utils/createJsxAttributeFromBoolean.js";
import { createJsxElement } from "../../utils/createJsxElement.js";
import { createLet } from "../../utils/createLet.js";
import { createObjectProperty } from "../../utils/createObjectProperty.js";
import { getIdentifierName } from "../../utils/getIdentifierName.js";
import { getImportedName } from "../../utils/getImportedName.js";
import { getPropName } from "../../utils/getPropName.js";
import { insertHookIntoComponent } from "../../utils/insertHookIntoComponent.js";
import { isJsxExpressionContainer } from "../../utils/isJsxExpressionContainer.js";
import { isPropEnabled } from "../../utils/isPropEnabled.js";
import { isTypeOfExpression } from "../../utils/isTypeOfExpression.js";
import { isTypescriptFile } from "../../utils/isTypescriptFile.js";
import { renameImportSpecifiers } from "../../utils/renameImportSpecifiers.js";

const LEGACY_TAB_COMPONENTS = ["TabsManager", "Tabs", "TabPanels", "TabPanel"];

interface UpdateComponentOptions {
  j: JSCodeshift;
  root: Collection;
  name: string | undefined;
  comments: Set<string>;
  rmdImports: Set<string>;
  reactImports: Set<string>;
  isTypescript: boolean;
}

function updateTabsComponent(options: UpdateComponentOptions): void {
  const { j, root, name, rmdImports } = options;
  if (!name) {
    return;
  }

  rmdImports.add("TabList");
  rmdImports.add("Tab");

  root
    .find(j.JSXElement, { openingElement: { name: { name } } })
    .forEach((jsxElement) => {
      const { openingElement } = jsxElement.node;

      const props: JSXAttributes = [];
      openingElement.attributes?.forEach((attr) => {
        if (j.JSXSpreadAttribute.check(attr)) {
          props.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "automatic": {
            const jsxAttr = createJsxAttributeFromBoolean({
              j,
              attr,
              name: "activationMode",
              value: "automatic",
              fallback: "manual",
            });
            if (jsxAttr) {
              props.push(jsxAttr);
            }
            break;
          }
          case "orientation":
            if (
              j.StringLiteral.check(attr.value) &&
              attr.value.value === "vertical"
            ) {
              props.push(j.jsxAttribute(j.jsxIdentifier("vertical")));
            } else if (isJsxExpressionContainer(j, attr.value)) {
              props.push(
                j.jsxAttribute(
                  j.jsxIdentifier("vertical"),
                  j.jsxExpressionContainer(
                    j.binaryExpression(
                      "===",
                      attr.value.expression,
                      j.stringLiteral("vertical")
                    )
                  )
                )
              );
            }
            break;
          case "align":
          case "padded":
          case "disableTransition":
            props.push(attr);
            break;
          default:
            props.push(attr);
        }
      });

      j(jsxElement).replaceWith(
        createJsxElement({
          j,
          name: "TabList",
          props: [
            j.jsxSpreadAttribute(
              j.callExpression(j.identifier("getTabListProps"), [])
            ),
            ...props,
          ],
          children: [j.jsxText("")],
        })
      );
    });
}

function updateTabsManager(options: UpdateComponentOptions): void {
  const { j, root, name, rmdImports, reactImports, isTypescript } = options;
  if (!name) {
    return;
  }

  rmdImports.add("useTabs");

  root
    .find(j.JSXElement, { openingElement: { name: { name } } })
    .forEach((jsxElement) => {
      const { openingElement, children = [] } = jsxElement.node;

      let tabConfigList: Identifier | undefined;
      const options: ObjectProperty[] = [];
      openingElement.attributes?.forEach((attr) => {
        if (j.JSXSpreadAttribute.check(attr)) {
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "tabsId": {
            let value: ExpressionKind | PatternKind | undefined;
            if (isJsxExpressionContainer(j, attr.value)) {
              value = attr.value.expression;
            } else if (j.StringLiteral.check(attr.value)) {
              value = attr.value;
            }
            if (value) {
              options.push(j.objectProperty(j.identifier("baseId"), value));
            }
            break;
          }
          case "defaultActiveIndex":
          case "activeIndex":
          case "onActiveIndexChange":
            break;
          case "tabs":
            // I only support `tabs={someIdentifier}` and not `tabs={["Tab 1", "Tab 2"]}`, etc
            if (
              isJsxExpressionContainer(j, attr.value) &&
              j.Identifier.check(attr.value.expression)
            ) {
              tabConfigList = attr.value.expression;
            }
            break;

          case "stacked":
          case "iconAfter": {
            if (isPropEnabled(attr)) {
              options.push(
                j.objectProperty(j.identifier(name), j.booleanLiteral(true))
              );
            } else if (
              isJsxExpressionContainer(j, attr.value) &&
              !j.BooleanLiteral.check(attr.value.expression)
            ) {
              options.push(
                j.objectProperty(j.identifier(name), attr.value.expression)
              );
            }
            break;
          }
        }
      });

      insertHookIntoComponent({
        j,
        name: "useTabs",
        args: options.length ? [j.objectExpression(options)] : [],
        from: jsxElement,
        result: j.objectPattern([
          createObjectProperty({ j, name: "getTabProps" }),
          createObjectProperty({ j, name: "getTabListProps" }),
          createObjectProperty({ j, name: "getTabPanelProps" }),
          createObjectProperty({ j, name: "getTabPanelsProps" }),
        ]),
      });
      j(jsxElement).replaceWith(
        j.jsxFragment(j.jsxOpeningFragment(), j.jsxClosingFragment(), children)
      );

      if (tabConfigList) {
        const mapTabs = j.memberExpression(tabConfigList, j.identifier("map"));
        const tabConfig = j.identifier("tab");
        if (isTypescript) {
          rmdImports.add("TabProps");
          reactImports.add("ReactNode");
        }

        root
          .find(j.JSXElement, {
            openingElement: { name: { name: "TabList" } },
          })
          .forEach((tabList) => {
            tabList.node.children = [
              j.jsxExpressionContainer(
                j.callExpression(mapTabs, [
                  // {(tabs.map((tab, i) => { ... }))}
                  j.arrowFunctionExpression(
                    [tabConfig, j.identifier("i")],
                    j.blockStatement([
                      // const tabProps = getTabProps(i)
                      createConst({
                        j,
                        id: j.identifier("tabProps"),
                        value: j.callExpression(j.identifier("getTabProps"), [
                          j.identifier("i"),
                        ]),
                      }),

                      // let children: ReactNode;
                      createLet({
                        j,
                        id: "children",
                        type: j.tsTypeReference(j.identifier("ReactNode")),
                        isTypescript,
                      }),

                      // let overrides: TabProps | undefined;
                      createLet({
                        j,
                        id: "overrides",
                        type: j.tsUnionType([
                          j.tsTypeReference(j.identifier("TabProps")),
                          j.tsUndefinedKeyword(),
                        ]),
                        isTypescript,
                      }),

                      j.ifStatement(
                        // if (typeof tab !== 'string' && "children" in tab)
                        j.logicalExpression(
                          "&&",
                          isTypeOfExpression({
                            j,
                            eq: false,
                            value: tabConfig,
                          }),
                          j.binaryExpression(
                            "in",
                            j.stringLiteral("children"),
                            tabConfig
                          )
                        ),

                        // { ... }
                        j.blockStatement([
                          // children = tab.children;
                          j.expressionStatement(
                            j.assignmentExpression(
                              "=",
                              j.identifier("children"),
                              j.memberExpression(
                                tabConfig,
                                j.identifier("children")
                              )
                            )
                          ),
                          // const { children: _c, contentStyle: _cs, contentClassName: _ccs, ...stillValidProps } = tab;
                          createDestructuredConst({
                            j,
                            props: [
                              j.objectProperty(
                                j.identifier("children"),
                                j.identifier("_c")
                              ),
                              j.objectProperty(
                                j.identifier("contentStyle"),
                                j.identifier("_cs")
                              ),
                              j.objectProperty(
                                j.identifier("contentClassName"),
                                j.identifier("_ccn")
                              ),
                              j.restProperty(j.identifier("stillValidProps")),
                            ],
                            value: tabConfig,
                          }),

                          // overrides = stillValidProps;
                          j.expressionStatement(
                            j.assignmentExpression(
                              "=",
                              j.identifier("overrides"),
                              j.identifier("stillValidProps")
                            )
                          ),
                        ]),
                        // else {
                        //  children = tab;
                        // }
                        j.blockStatement([
                          j.expressionStatement(
                            j.assignmentExpression(
                              "=",
                              j.identifier("children"),
                              tabConfig
                            )
                          ),
                        ])
                      ),

                      j.returnStatement(
                        createJsxElement({
                          j,
                          name: "Tab",
                          props: [
                            j.jsxSpreadAttribute(j.identifier("tabProps")),
                            j.jsxSpreadAttribute(j.identifier("overrides")),
                            j.jsxAttribute(
                              j.jsxIdentifier("key"),
                              j.jsxExpressionContainer(
                                j.memberExpression(
                                  j.identifier("tabProps"),
                                  j.identifier("id")
                                )
                              )
                            ),
                          ],
                          children: [
                            j.jsxExpressionContainer(
                              j.jsxIdentifier("children")
                            ),
                          ],
                        })
                      ),
                    ])
                  ),
                ])
              ),
            ];
          });
      }
    });
}

interface UpdateTabPanelsOptions extends UpdateComponentOptions {
  tabsManager: string | undefined;
}

function updateTabPanels(options: UpdateTabPanelsOptions): void {
  const { j, root, name, comments, rmdImports, tabsManager } = options;
  if (!name) {
    return;
  }

  rmdImports.add("SlideContainer");

  const flags: Record<
    "persistent" | "disableScrollFix" | "disableTransition",
    ExpressionKind | undefined
  > = {
    persistent: undefined,
    disableScrollFix: undefined,
    disableTransition: undefined,
  };
  root
    .find(j.JSXElement, { openingElement: { name: { name } } })
    .forEach((jsxElement) => {
      const { children = [], openingElement } = jsxElement.node;

      let spread = false;
      const props: JSXAttributes = [];

      openingElement.attributes?.forEach((attr) => {
        if (j.JSXSpreadAttribute.check(attr)) {
          spread = true;
          props.push(attr);
          return;
        }

        const name = getPropName(attr);
        switch (name) {
          case "disableScrollFix":
          case "disableTransition":
            if (isJsxExpressionContainer(j, attr.value)) {
              flags[name] = attr.value.expression;
            } else if (isPropEnabled(attr)) {
              flags[name] = j.booleanLiteral(true);
            }
            break;
          case "persistent":
            // Slide is persistent by default
            break;
          default:
            props.push(attr);
        }
      });
      if (tabsManager) {
        props.unshift(
          j.jsxSpreadAttribute(
            j.callExpression(j.identifier("getTabPanelsProps"), [])
          )
        );
      } else if (!spread) {
        comments.add(
          "TODO: The `SlideContainer` had a spread property and might need to add {...getTabPanelsProps()} to work correctly"
        );
      }

      j(jsxElement).replaceWith(
        createJsxElement({
          j,
          name: "SlideContainer",
          props: [...props],
          children,
        })
      );
    });

  const { disableScrollFix, disableTransition } = flags;
  if (disableScrollFix || disableTransition) {
    root
      .find(j.CallExpression, {
        callee: { name: "useTabs" },
        arguments: [{ type: "ObjectExpression" }],
      })
      .forEach((callExpression) => {
        const options = callExpression.node.arguments[0];
        if (!j.ObjectExpression.check(options)) {
          return;
        }

        if (disableScrollFix) {
          options.properties.push(
            j.objectProperty(j.identifier("disableScrollFix"), disableScrollFix)
          );
        }

        if (disableTransition) {
          options.properties.push(
            j.objectProperty(
              j.identifier("disableTransition"),
              disableTransition
            )
          );
        }
      });
  }
}

function updateTabPanel(options: UpdateTabPanelsOptions): void {
  const { j, root, name, rmdImports, tabsManager } = options;
  if (!name) {
    return;
  }

  rmdImports.add("Slide");
  root
    .find(j.JSXElement, { openingElement: { name: { name } } })
    .forEach((jsxElement, i) => {
      const { openingElement, closingElement } = jsxElement.node;
      let index: NumericLiteral | Identifier = j.numericLiteral(i);

      j(jsxElement)
        .closest(j.JSXExpressionContainer, {
          expression: { type: "CallExpression" },
        })
        .forEach((jsxExpressionContainer) => {
          const { expression } = jsxExpressionContainer.node;
          if (
            !j.CallExpression.check(expression) ||
            !j(expression).find(j.Identifier, { name: "map" }).length
          ) {
            return;
          }

          const [fn] = expression.arguments;

          // Won't support:
          // {tabs.map(someMapFunction)}
          if (j.Identifier.check(fn)) {
            return;
          }

          // only support:
          // {tabs.map((tab) => ...)}
          // {tabs.map(function (tab) {... })}
          if (
            !j.ArrowFunctionExpression.check(fn) &&
            !j.FunctionExpression.check(fn)
          ) {
            return;
          }

          if (j.Identifier.check(fn.params[1])) {
            index = fn.params[1];
          } else {
            index = j.identifier("tabConfigIndex");
            fn.params[1] = index;
          }
        });

      openingElement.name = j.jsxIdentifier("Slide");
      if (closingElement) {
        closingElement.name = openingElement.name;
      }

      if (tabsManager) {
        const props = openingElement.attributes ?? [];
        props.unshift(
          j.jsxSpreadAttribute(
            j.callExpression(j.identifier("getTabPanelProps"), [index])
          )
        );

        openingElement.attributes = props;
      }
    });
}

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const isTypescript = isTypescriptFile(file);
  const comments = new Set<string>();
  const tabsLookup = new Map<string, string>();
  const rmdImports = new Set<string>();
  const reactImports = new Set<string>();
  root
    .find(j.ImportDeclaration, { source: { value: "react-md" } })
    .find(j.ImportSpecifier)
    .forEach((importSpecifier) => {
      const rmdName = getIdentifierName(importSpecifier.node.imported);
      const localName = getImportedName(importSpecifier);

      if (LEGACY_TAB_COMPONENTS.includes(rmdName)) {
        tabsLookup.set(rmdName, localName);
        j(importSpecifier).remove();
      }
    });

  const tabsManager = tabsLookup.get("TabsManager");
  const tabs = tabsLookup.get("Tabs");
  const tabPanels = tabsLookup.get("TabPanels");
  const tabPanel = tabsLookup.get("TabPanel");
  const foundTabComponents = [tabsManager, tabs, tabPanels, tabPanel].filter(
    Boolean
  ).length;

  if (foundTabComponents > 0 && foundTabComponents !== 4) {
    comments.add(
      "TODO: The `TabsManager`, `Tabs`, `TabPanels`, and `TabPanel` components are not in the same file and will need to be updated manually."
    );
  }

  const opts = {
    j,
    root,
    comments,
    rmdImports,
    reactImports,
    isTypescript,
  } as const;

  updateTabsComponent({
    ...opts,
    name: tabs,
  });
  updateTabsManager({
    ...opts,
    name: tabsManager,
  });

  // do this first since we need to move any persistent flags to this component
  // with the `updateTabPanels`
  updateTabPanel({
    ...opts,
    name: tabPanel,
    tabsManager,
  });
  updateTabPanels({
    ...opts,
    name: tabPanels,
    tabsManager,
  });

  renameImportSpecifiers({
    j,
    root,
    names: {
      TabConfig: "TabProps",
    },
  });

  addImportSpecifiers({
    j,
    root,
    imports: rmdImports,
  });
  addImportSpecifiers({
    j,
    root,
    imports: reactImports,
    packageName: "react",
  });
  addFileComments({
    j,
    root,
    comments,
  });
  return root.toSource(printOptions);
}
