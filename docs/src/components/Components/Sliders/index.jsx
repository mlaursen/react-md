import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import SimpleContinuousSliders from './SimpleContinuousSliders';
import SimpleContinuousSlidersRaw from '!!raw-loader!./SimpleContinuousSliders.jsx';
import SimpleDiscreteSliders from './SimpleDiscreteSliders';
import SimpleDiscreteSlidersRaw from '!!raw-loader!./SimpleDiscreteSliders.jsx';
import CustomRangeAndTicks from './CustomRangeAndTicks';
import CustomRangeAndTicksRaw from '!!raw-loader!./CustomRangeAndTicks.jsx';
import WithIcons from './WithIcons';
import WithIconsRaw from '!!raw-loader!./WithIcons.jsx';
import Editable from './Editable';
import EditableRaw from '!!raw-loader!./Editable.jsx';

const examples = [{
  title: 'Simple Continuous Sliders',
  description: `
Continuous sliders show no real indication of what the \`value\` is for the range. They are normally
used when precision isn't fully required. The basic props required for a \`Slider\` is the \`id\` prop
for accessibility and linking the slider with the \`<input type="range">\` hidden behind the scenes. You
can also provide a \`label\` that will get displayed above the slider.

When a keyboard user tab-focuses this slider, a ring will appear around the slider and the user can select
values with the left or right arrow keys. Once they tab away, that value will be set.
  `,
  code: SimpleContinuousSlidersRaw,
  children: <SimpleContinuousSliders />,
}, {
  title: 'Simple Discrete Sliders',
  description: `
Discrete sliders are used when more precision is required for the sliding range. When the user touches
or clicks the slider, a "balloon" will appear that displays the current value. While the user drags the
slider, the value will update in real time to show the value. Once the user clicks or touches away from
the slider, the "balloon" will be hidden again.

When a keyboard user tab-focuses the slider, it will show the balloon and a small ring for a second to indicate
focus. They can then select values just like the continuous slider by using the left and right arrow keys.
  `,
  code: SimpleDiscreteSlidersRaw,
  children: <SimpleDiscreteSliders />,
}, {
  title: 'Custom Range and Ticks',
  description: `
By default the slider uses a 0-100 scale and "step" increments of 1, but you can update this by setting a \`min\`,
\`max\`, and/or \`step\` prop. Right now, I only support a min and max range on the same side of 0 (so just don't
do a negative to positive range) because I couldn't get the maths right.

It is generally recommended to use a larger range for the slider as it will appear more "fluid". When there is a smaller
range, the slider will attempt to fix itself to the closest value after stops dragging.

When using discrete sliders, you can also add tick marks at certain points to help show the progress of the slider.
  `,
  code: CustomRangeAndTicksRaw,
  children: <CustomRangeAndTicks />,
}, {
  title: 'Sliders with icons',
  description: `
Sliders have been updated to also have support for displaying icons inline with the slider. I'm not sure what the major use-case
is for it, but it looks neat.
  `,
  code: WithIconsRaw,
  children: <WithIcons />,
}, {
  title: 'Editable Sliders',
  description: `
In some cases, it can be easier for users to specifically state the number they want in the range by using a text field. If
the \`editable\` prop is provided, a number text field will be placed to the right of the slider and allow for real-time updates
if the user changes the value using that field.
  `,
  code: EditableRaw,
  children: <Editable />,
}];

const Sliders = () => <ExamplesPage description={README} examples={examples} />;
export default Sliders;
