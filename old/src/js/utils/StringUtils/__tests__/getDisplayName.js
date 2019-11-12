/* eslint-env jest */
import React from 'react';
import getDisplayName from '../getDisplayName';

describe('getDisplayName', () => {
  it('should update the display name', () => {
    expect(getDisplayName({ displayName: 'Button' }, 'Ink')).toBe('withInk(Button)');
    expect(getDisplayName({ name: 'Something' }, 'Pure')).toBe('withPure(Something)');
  });

  it('should be able to work with React components', () => {
    class ComponentExample extends React.Component {
      render() {
        return null;
      }
    }

    expect(getDisplayName(ComponentExample, 'Wrapper')).toBe('withWrapper(ComponentExample)');
  });

  it('should be able to work on a name that has been wrapped', () => {
    const component = { displayName: 'withWrapper(Example)' };
    expect(getDisplayName(component, 'Unwrapper')).toBe('withUnwrapper(withWrapper(Example))');
  });
});
