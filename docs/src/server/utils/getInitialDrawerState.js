import toPageTitle from 'utils/StringUtils/toPageTitle';

export default function getInitialDrawerState(req) {
  const userAgent = req.header('user-agent');
  const mobile = !!userAgent.match(/mobile/i);
  const tablet = !!userAgent.match(/ipad/i);
  const desktop = !mobile && !tablet;

  const pathname = req.url;
  let defaultMedia = 'desktop';
  if (tablet) {
    defaultMedia = 'tablet';
  } else if (mobile) {
    defaultMedia = 'mobile';
  }

  return {
    mobile,
    tablet,
    desktop,
    defaultMedia,
    visibleToolbarTitle: true,
    toolbarTitle: toPageTitle(pathname).replace(/\?.*/, ''),
    toolbarProminent: !pathname.match(/minimizing/) && !!pathname.match(/components|customization/),
    visibleBoxShadow: !!pathname,
  };
}
