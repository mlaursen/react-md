/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { mount } from 'enzyme';

import EditDialogColumn from '../EditDialogColumn';
import EditDialog from '../EditDialog';
import TableColumn from '../TableColumn';
import DataTable from '../DataTable';
import TableRow from '../TableRow';
import TableBody from '../TableBody';
import FontIcon from '../../FontIcons/FontIcon';
import Button from '../../Buttons/Button';
import TextField from '../../TextFields/TextField';

/* eslint-disable react/prop-types */
class Wrapper extends React.Component {
  static defaultProps = {
    baseId: 'testing',
  };

  render() {
    const { baseId, children } = this.props;
    return (
      <DataTable baseId={baseId}>
        <TableBody>
          <TableRow>
            {children}
          </TableRow>
        </TableBody>
      </DataTable>
    );
  }
}

describe('EditDialogColumn', () => {
  it('should apply the className correctly', () => {
    const wrapper = mount(<Wrapper><EditDialogColumn label="Hello" className="test-column" /></Wrapper>);
    const dialog = wrapper.find(EditDialogColumn);
    expect(dialog.hasClass('edit-dialog-column'));
    expect(dialog.hasClass('test-column'));
  });

  it('should render a TableColumn with the correct props', () => {
    const props = {
      style: { background: 'red' },
      className: 'testing-column',
      label: 'Woop',
    };
    const wrapper = mount(<Wrapper><EditDialogColumn {...props} /></Wrapper>);
    const column = wrapper.find(TableColumn);
    expect(column.length).toBe(1);
    expect(column.props().style).toBe(props.style);
    expect(column.props().className).toContain(props.className);
  });

  it('should render an EditDialog when not inline and just a text field when inline', () => {
    let wrapper = mount(<Wrapper><EditDialogColumn label="Hello" inline={false} /></Wrapper>);
    expect(wrapper.find(EditDialog).length).toBe(1);
    expect(wrapper.find(TextField).length).toBe(0);

    wrapper = mount(<Wrapper><EditDialogColumn placeholder="Hello" inline /></Wrapper>);
    expect(wrapper.find(EditDialog).length).toBe(0);
    expect(wrapper.find(TextField).length).toBe(1);
  });

  it('should apply the okProps and cancelProps correctly', () => {
    const props = {
      label: 'Label',
      placeholder: 'Placeholder',
      title: 'Large',
      large: true,
      defaultVisible: true,
      okProps: {
        disabled: true,
      },
      cancelProps: {
        iconEl: <FontIcon />,
      },
    };

    const wrapper = mount(<Wrapper><EditDialogColumn {...props} /></Wrapper>);
    const buttons = wrapper.find(Button);
    expect(buttons.length).toBe(2);
    expect(buttons.get(0).props.iconEl).toBe(props.cancelProps.iconEl);
    expect(buttons.get(1).props.disabled).toBe(true);
  });

  it('should prefer the okProps and cancelProps over the other ok/cancel EditDialogColumn props except for onClick', () => {
    const props = {
      label: 'Label',
      placeholder: 'Placeholder',
      title: 'Large',
      large: true,
      defaultVisible: true,
      okLabel: 'Ok',
      okPrimary: true,
      okSecondary: true,
      okProps: {
        onClick: () => {},
        primary: false,
        secondary: false,
        children: <FontIcon />,
        flat: false,
        icon: true,
      },
      cancelLabel: 'Cancel',
      cancelPrimary: true,
      cancelSecondary: true,
      cancelProps: {
        onClick: () => {},
        primary: false,
        secondary: false,
        children: <FontIcon />,
        flat: false,
        raised: true,
      },
    };

    const wrapper = mount(<Wrapper><EditDialogColumn {...props} /></Wrapper>);
    const buttons = wrapper.find(Button);
    expect(buttons.length).toBe(2);

    const cancel = buttons.get(0);
    const ok = buttons.get(1);
    expect(ok.props.onClick).not.toBe(props.okProps.onClick);
    expect(ok.props.primary).toBe(props.okProps.primary);
    expect(ok.props.secondary).toBe(props.okProps.secondary);
    expect(ok.props.children).toBe(props.okProps.children);
    expect(ok.props.flat).toBe(props.okProps.flat);
    expect(ok.props.icon).toBe(props.okProps.icon);

    expect(cancel.props.onClick).not.toBe(props.cancelProps.onClick);
    expect(cancel.props.primary).toBe(props.cancelProps.primary);
    expect(cancel.props.secondary).toBe(props.cancelProps.secondary);
    expect(cancel.props.children).toBe(props.cancelProps.children);
    expect(cancel.props.flat).toBe(props.cancelProps.flat);
    expect(cancel.props.raised).toBe(props.cancelProps.raised);
  });

  it('should render without errors when the inlineIcon is set to null', () => {
    mount(<Wrapper><EditDialogColumn id="test" inlineIcon={null} inline placeholder="Placeholder" /></Wrapper>);
  });
});
