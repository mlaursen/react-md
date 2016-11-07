import toPageTitle from 'utils/StringUtils/toPageTitle';

export default function getInitialDrawerState(req) {
  const userAgent = req.header('user-agent');
  const mobile = !!userAgent.match(/mobile/i);
  const tablet = !!userAgent.match(/ipad/i);
  const desktop = !mobile && !tablet;

  const pathname = req.url;
  let drawerType = 'desktop';
  if (tablet) {
    drawerType = 'tablet';
  } else if (mobile) {
    drawerType = 'mobile';
  }

  return {
    mobile,
    tablet,
    desktop,
    drawerType,
    toolbarTitle: toPageTitle(pathname),
    toolbarProminent: !pathname.match(/minimizing/) && !!pathname.match(/components|customization/),
    visibleBoxShadow: !!pathname,
  };
}
