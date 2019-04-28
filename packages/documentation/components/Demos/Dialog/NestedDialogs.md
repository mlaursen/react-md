Dialogs can also be nested fairly easily since they use the #portal API behind
the scenes so that the last created dialog will be shown over all the other
dialogs. However, since each dialog creates its own overlay, the background will
start getting darker and darker as more dialogs appear on the page and pressing
the escape key will close all dialogs by default.

To fix this, there is an export component: `NestedDialogContextProvider` that
you can add near the root of your app to automatically fix these problems. Once
the component has been added to your app, the `Dialog` will check to see if it
is the last created dialog. If it is not, it will disable the escape key close
functionality as well as temporarily hide its own overlay so the screen doesn't
get darker.

The example below will show how you can nest multiple dialogs together as well
as configuring the scroll locking behavior so that full page dialogs can
correctly hide their scrollbar and prevent scrolling when a child dialog
appears.
