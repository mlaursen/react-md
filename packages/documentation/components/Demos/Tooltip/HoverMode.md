Tooltips can also be updated to have a "hover mode" so that subsequent tooltips
are shown immediately instead of requiring the default delay. After no tooltips
have been shown via mouse for a few seconds, the "hover mode" will be disabled
and the initial hover delay will be used again. This feature is actually enabled
throughout the app but disabled for these demos to help show the default tooltip
behavior.

To hook into the hover mode, all you need to do is use the
`TooltipHoverModeConfig` component as a parent of all the elements that have
tooltips. The component can either be at the root of your app, or a small
section so that only a few tooltips are "linked together" with this hover mode
flow.
