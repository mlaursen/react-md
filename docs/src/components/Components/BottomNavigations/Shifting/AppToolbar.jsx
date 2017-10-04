import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button, TextField, Toolbar } from 'react-md';

const AppToolbar = ({ inset }) => {
  let search;
  const actions = [<Button key="kebab" icon>more_vert</Button>];
  if (!inset) {
    actions.unshift(<Button key="refresh" icon>refresh</Button>);
  } else {
    search = <TextField key="search" placeholder="Search" block className="md-title--toolbar" id="search-content" />;
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
