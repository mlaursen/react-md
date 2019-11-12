import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  EditDialogColumn,
} from 'react-md';

const EditDialogExample = () => (
  <DataTable baseId="edit-dialog-example" fullWidth={false} className="data-tables__edit-table-example">
    <TableHeader>
      <TableRow>
        <TableColumn>Some Data</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <EditDialogColumn label="Default edit dialog" />
      </TableRow>
      <TableRow>
        <EditDialogColumn label="Large edit dialog" large title="Large!" />
      </TableRow>
      <TableRow>
        <EditDialogColumn placeholder="Inline edits" inline />
      </TableRow>
      <TableRow>
        <EditDialogColumn label="No focus open" visibleOnFocus={false} />
      </TableRow>
      <TableRow>
        <EditDialogColumn label="Large edit dialog (no focus open)" large title="Large!" visibleOnFocus={false} />
      </TableRow>
      <TableRow>
        <EditDialogColumn
          placeholder="With a counter"
          maxLength={20}
          errorText="Limit 20 characters"
        />
      </TableRow>
      <TableRow>
        <EditDialogColumn
          large
          title="With Help Text"
          label="Some field"
          placeholder="Focus me for help"
          helpText="Hey, look at me! I have some text to help you."
          helpOnFocus
        />
      </TableRow>
      <TableRow>
        <EditDialogColumn
          large
          title="Mutliline text field"
          label="Some text"
          placeholder="This field will grow as you type"
          rows={1}
          maxRows={4}
          helpText="max rows = 4"
        />
      </TableRow>
    </TableBody>
  </DataTable>
);

export default EditDialogExample;
