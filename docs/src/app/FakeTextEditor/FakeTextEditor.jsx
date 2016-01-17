import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SelectField from 'react-md/SelectFields';
import FontIcon from 'react-md/FontIcon';
import Paper from 'react-md/Paper';
import Toolbar from 'react-md/Toolbars';
import { Radio, Checkbox } from 'react-md/SelectionControls';

const FONTS = ['Calibri', 'Courier New', 'Roboto', 'Verdana'];
const FONT_SIZES = [11, 12, 14, 16, 18, 22];

const BoldIcon = <FontIcon>format_bold</FontIcon>;
const ItalicIcon = <FontIcon>format_italic</FontIcon>;
const UnderlineIcon = <FontIcon>format_underline</FontIcon>;
const AlignLeftIcon = <FontIcon>format_align_left</FontIcon>;
const AlignJustifyIcon = <FontIcon>format_align_justify</FontIcon>;
const AlignCenterIcon = <FontIcon>format_align_center</FontIcon>;
const AlignRightIcon = <FontIcon>format_align_right</FontIcon>;

export default class FakeTextEditor extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      fontFamily: FONTS[2],
      fontSize: FONT_SIZES[3],
      fontWeight: null,
      fontStyle: null,
      textDecoration: null,
      textAlign: 'left',
      padding: '1em',
      transition: 'all .3s', //woop
    };
  }

  render() {
    return (
      <Paper>
        <Toolbar className="fake-text-editor">
          <SelectField
            menuItems={FONTS}
            itemValue="label"
            below
            className="font-names"
            value={this.state.fontFamily}
            onChange={(fontFamily) => this.setState({ fontFamily })}
          />
          <hr className="md-divider vertical inset" />
          <SelectField
            menuItems={FONT_SIZES}
            below
            className="font-sizes"
            value={this.state.fontSize}
            onChange={(fontSize) => this.setState({ fontSize })}
          />
          <hr className="md-divider vertical inset" />
          <Checkbox
            uncheckedIcon={BoldIcon}
            checkedIcon={BoldIcon}
            checked={this.state.fontWeight === 'bold'}
            onChange={(checked) => this.setState({ fontWeight: checked ? 'bold' : null })}
          />
          <Checkbox
            uncheckedIcon={ItalicIcon}
            checkedIcon={ItalicIcon}
            checked={this.state.fontStyle === 'italic'}
            onChange={(checked) => this.setState({ fontStyle: checked ? 'italic' : null })}
          />
          <Checkbox
            uncheckedIcon={UnderlineIcon}
            checkedIcon={UnderlineIcon}
            checked={this.state.textDecoration === 'underline'}
            onChange={(checked) => this.setState({ textDecoration: checked ? 'underline' : null })}
          />
          <hr className="md-divider vertical inset" />
          <Radio
            uncheckedIcon={AlignLeftIcon}
            checkedIcon={AlignLeftIcon}
            checked={this.state.textAlign === 'left'}
            onChange={this.setState.bind(this, { textAlign: 'left' })}
          />
          <Radio
            uncheckedIcon={AlignCenterIcon}
            checkedIcon={AlignCenterIcon}
            checked={this.state.textAlign === 'center'}
            onChange={this.setState.bind(this, { textAlign: 'center' })}
          />
          <Radio
            uncheckedIcon={AlignRightIcon}
            checkedIcon={AlignRightIcon}
            checked={this.state.textAlign === 'right'}
            onChange={this.setState.bind(this, { textAlign: 'right' })}
          />
          <Radio
            uncheckedIcon={AlignJustifyIcon}
            checkedIcon={AlignJustifyIcon}
            checked={this.state.textAlign === 'justify'}
            onChange={this.setState.bind(this, { textAlign: 'justify' })}
          />
        </Toolbar>
        <p style={this.state}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sequitur disserendi ratio cognitioque naturae; Ergo, si semel tristior effectus est, hilara vita amissa est? Duo Reges: constructio interrete. Ergo ita: non posse honeste vivi, nisi honeste vivatur? Hoc est non modo cor non habere, sed ne palatum quidem. At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Cur id non ita fit? Hoc simile tandem est? Aliena dixit in physicis nec ea ipsa, quae tibi probarentur; At eum nihili facit;</p>
        <p style={this.state}>Tu quidem reddes; Iam doloris medicamenta illa Epicurea tamquam de narthecio proment: Si gravis, brevis; Quid turpius quam sapientis vitam ex insipientium sermone pendere? Idemne potest esse dies saepius, qui semel fuit? Item de contrariis, a quibus ad genera formasque generum venerunt. At iam decimum annum in spelunca iacet.</p>
        <p style={this.state}>Si verbum sequimur, primum longius verbum praepositum quam bonum. Universa enim illorum ratione cum tota vestra confligendum puto. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Ut enim consuetudo loquitur, id solum dicitur honestum, quod est populari fama gloriosum. Gerendus est mos, modo recte sentiat. Pugnant Stoici cum Peripateticis. Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere. Id est enim, de quo quaerimus. Non est igitur summum malum dolor. Est enim tanti philosophi tamque nobilis audacter sua decreta defendere.</p>
      </Paper>
    );
  }
}
