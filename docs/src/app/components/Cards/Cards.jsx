import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Card, CardTitle, CardText, CardMedia, CardActions } from 'react-md/Cards';

import DocPage from 'react-md-documentation';
import ExpandableCard from './ExpandableCard';
import ExpandableCardRaw from '!!raw!./ExpandableCard';
import CardListExample from './CardListExample';
import CardListExampleRaw from '!!raw!./CardListExample';
//import './_card.scss';

export default class Cards extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Card,
          desc: `This component wraps all the card parts and adds expanding functionality
          to the card sections.`,
          details: [{
            name: 'children',
            pt: 'no',
            desc: 'A list of children to manage. This should be a single or list of React component(s).',
          }, {
            name: 'raise',
            pt: 'b',
            desc: 'Boolean if the card should raise on hover.',
          }, {
            name: 'isInitialExpanded',
            pt: 'b',
            desc: 'Boolean if anything after the card expander is initially expanded.',
          }, {
            name: 'iconClassName',
            pt: 's',
            desc: `The iconClassName to use for the expander icon.
            Note: The icon will be flipped by a transform function when opened.`,
          }, {
            name: 'iconChildren',
            pt: 'no',
            desc: 'Any children required to render the expander icon',
          }],
        }, {
          component: CardTitle,
          desc: `This is a card's title. This can be placed in the base \`Card\` component
          or it can be placed in a \`CardMedia\`'s overlay.`,
          details: [{
            name: 'title',
            pt: 's',
            desc: 'A title to display.',
          }, {
            name: 'subtitle',
            pt: 's',
            desc: 'An optional subtitle to display.',
          }, {
            name: 'avatar',
            pt: 'no',
            desc: 'An optional avatar to display to the left of the title and subtitle.',
          }],
        }, {
          component: CardText,
          desc: 'A wrapper for placing any text content in a card. _Or anything really_.',
          details: [{
            name: 'component',
            pt: 's',
            desc: 'The component to render the card text as.',
          }],
        }, {
          component: CardMedia,
          desc: `This is a component for displaying some media information at the correct
          aspect ratio from the material design docs.`,
          details: [{
            name: 'aspectRatio',
            pt: `one(['${CardMedia.aspect.equal}, '${CardMedia.aspect.wide}'])`,
            desc: `This is the aspect ratio to use for a card media item.
            To be safe, you should probably use \`CardMedia.aspect.equal\`
            '(${CardMedia.aspect.equal}') or \`CardMedia.aspect.wide\` ('${CardMedia.aspect.wide}').`,
          }, {
            name: 'forceAspect',
            pt: 'b',
            desc: 'Boolean if the \`aspectRation\` should be forced. *should* be true 99% of the time.',
          }, {
            name: 'overlay',
            pt: 'no',
            desc: `An optional overlay to display over the media item. This should be the
            \`CardTitle\` component and optionally the \`CardActions\` component. They
            will be modified to be styled for the overlay.`,
          }, {
            name: 'children',
            pt: 'no',
            desc: 'The media item to display. Usually an image or some graphic.',
          }],
        }, {
          component: CardActions,
          desc: `This is a wrapper component for adding actions to a card. This is usually
          some amount of \`FlatButton\`s or \`IconButton\`s. The children will be put in
          an \`.action-area\` that is a flexbox.`,
          details: [{
            name: 'isExpander',
            pt: 'b',
            desc: `Boolean if the this is the expander component for the card. If it is
            \`true\`, it will add the expander icon button.`,
          }, {
            name: 'centered',
            pt: 'ba',
            desc: 'Boolean if the card actions should be centered versus \`space-between\`',
          }],
        }]}
        examples={[{
          markdown: ExpandableCardRaw,
          children: <ExpandableCard />,
        }, {
          markdown: CardListExampleRaw,
          children: <CardListExample />,
        }]}
        >
        <p>
          A card is a sheet of material that serves as an entry point to more
          detailed information. A card could contain a photo, text, and a link
          about a single subject.
        </p>
      </DocPage>
    );
  }
}
