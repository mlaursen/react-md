/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import EditDialogColumn from '../EditDialogColumn';
import EditDialog from '../EditDialog';
import TableColumn from '../TableColumn';
import DataTable from '../DataTable';
import TableRow from '../TableRow';
import TableBody from '../TableBody';
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
});
