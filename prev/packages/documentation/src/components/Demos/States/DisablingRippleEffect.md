Since some designers or users do not like the ripple effect from material
design, there is a fallback option to disable ripples and use normal background
color changes instead as a simplified pressed states interaction. You can switch
to this feature by either updating the `StatesConfig` to enable the
`disableRipple` prop which will make all interactable elements from `react-md`
no longer use the ripple effect or provide the `disableRipple` effect to each
interactable element.

> If you enable `disableRipple` on the `StatesConfig` component, you can set
> `disableRipple={false}` to a specific interactable element to enable ripples
> again **only for that element** as well.
