# @react-md/transition

<!-- TOC_START -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  * [Styles](#styles)
  * [Mixins](#mixins)
  * [Variables](#variables)
<!-- TOC_END -->

## Installation
```sh
$ npm install --save @react-md/transition
```

## Usage
### Styles
Including all the base styles can be done by either importing the styles file from the `dist` folder or importing the helpers file and using the mixin `react-md-transition`:

```scss
// This import will generate styles by default.
@import '@react-md/transition/dist/styles';
```

or

```scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/transition/dist/transition';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-transition;
```

If you would like to just import all the utility variables, mixins, and functions:
```scss
@import '@react-md/transition/dist/transition';

// Any custom styles that use the utilities
```

<!-- SASSDOC_START -->

### Mixins

<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-transition(type)</code></td>
<td>Adds a transition timing function for the provided transition type.
<h5>Parameters</h5>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</thead>
<tbody>
<tr>
<td>type</td>
<td>String</td>
<td></td>
<td>The transition type that should be used. This should be one of the
    keys for <code>$rmd-transitions</code></td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>


### Variables
<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>rmd-transitions</code></td>
<td>A Map of all the available transitions for react-md.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-enter-transition-time</code></td>
<td>The default enter transition time.
<br /><br /></td>
</tr>
<tr>
<td><code>rmd-leave-transition-time</code></td>
<td>The default leave transition time.
<br /><br /></td>
</tr>
</tbody>
</table>

<!-- SASSDOC_END -->
