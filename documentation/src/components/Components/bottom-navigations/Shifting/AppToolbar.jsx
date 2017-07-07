import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

const AppToolbar = ({ inset }) => {
  let search;
  const actions = [<Button key="kebab" icon>more_vert</Button>];
  if (!inset) {
    actions.unshift(<Button key="refresh" icon>refresh</Button>);
  } else {
    search = <TextField key="search" placeholder="Search" block className="md-title--toolbar" />;
  }

  return (
    <Toolbar
      inset={inset}
      className={cn('phone-emulator__toolbar', {
        'md-background--card': inset,
      })}
      themed={!inset}
      nav={<Button icon>menu</Button>}
      actions={actions}
      fixed
      zDepth={inset ? undefined : 0}
    >
      {search}
    </Toolbar>
  );
};

AppToolbar.propTypes = {
  inset: PropTypes.bool,
};

export default AppToolbar;
