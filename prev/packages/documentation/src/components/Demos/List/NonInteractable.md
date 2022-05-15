You can also create non-interactable lists by using the `SimpleListItem`
component even though this method is not recommended as using the default `<ul>`
or `<ol>` elements along with `<li>` might be a bit easier due to some styling
issues.

Since each `ListItem` and `SimpleListItem` is set to `display: flex` to help
with positioning all the parts, the default list styles are invalid since they
will only appear with `display: list-item`. You can add the styles back by
applying margin and a `&::before` element that contains the middle dot or the
current index when using an ordered list. This example shows a way to handle
both use cases.
