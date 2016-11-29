import { connect } from 'react-redux';

import AppFooter from 'components/AppFooter';

export default connect(({ ui: { quickNavigation, drawer: { mobile } } }) => ({ ...quickNavigation, mobile }))(AppFooter);
