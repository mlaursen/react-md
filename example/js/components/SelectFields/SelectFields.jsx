import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DocPage from '../../DocPage';
import code from './code.txt';

import { SelectField, Toolbar, Paper } from '../../../../src/js';
const FONTS = ['Calibri', 'Courier New', 'Roboto', 'Verdana'];
const req = new XMLHttpRequest();

export default class SelectFields extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { states: [] };
  }

  componentDidMount() {
    req.addEventListener('load', this.setText);

    req.open('GET', 'data/states.json', true);
    req.send();
  }

  setText = () => {
    this.setState({ states: JSON.parse(req.responseText) });
  }

  render() {
    return (
      <DocPage
        imports={['SelectField']}
        code={code}
        examples={[
          <Paper>
            <Toolbar>
              <SelectField menuItems={FONTS} itemValue="label" below className="font-names" />
              <SelectField menuItems={[10, 11, 12, 14, 16, 22]} below className="font-sizes" />
            </Toolbar>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sequitur disserendi ratio cognitioque naturae; Ergo, si semel tristior effectus est, hilara vita amissa est? Duo Reges: constructio interrete. Ergo ita: non posse honeste vivi, nisi honeste vivatur? Hoc est non modo cor non habere, sed ne palatum quidem. At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Cur id non ita fit? Hoc simile tandem est? Aliena dixit in physicis nec ea ipsa, quae tibi probarentur; At eum nihili facit;</p>
            <p>Tu quidem reddes; Iam doloris medicamenta illa Epicurea tamquam de narthecio proment: Si gravis, brevis; Quid turpius quam sapientis vitam ex insipientium sermone pendere? Idemne potest esse dies saepius, qui semel fuit? Item de contrariis, a quibus ad genera formasque generum venerunt. At iam decimum annum in spelunca iacet.</p>
            <p>Si verbum sequimur, primum longius verbum praepositum quam bonum. Universa enim illorum ratione cum tota vestra confligendum puto. Quae quo sunt excelsiores, eo dant clariora indicia naturae. Ut enim consuetudo loquitur, id solum dicitur honestum, quod est populari fama gloriosum. Gerendus est mos, modo recte sentiat. Pugnant Stoici cum Peripateticis. Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere. Id est enim, de quo quaerimus. Non est igitur summum malum dolor. Est enim tanti philosophi tamque nobilis audacter sua decreta defendere.</p>
          </Paper>,
          <Paper>
            {this.state.states.length &&
            <SelectField menuItems={this.state.states} itemLabel="abbreviation" itemValue="abbreviation" />
            }
          </Paper>,
        ]}
        components={[{
          component: SelectField,
          details: [],
        }]}
      />
    );
  }
}
