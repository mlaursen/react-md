import { withRouter } from 'react-router';
/**
 * There is probably a real way to do this, but separating the files into
 * App, History, and ConnectedApp were the only way I could get hot reloading
 * to work.
 */
import ConnectedApp from './ConnectedApp';

export default withRouter(ConnectedApp);
