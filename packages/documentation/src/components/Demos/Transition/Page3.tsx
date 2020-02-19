import React, { forwardRef, HTMLAttributes } from "react";
import { Text } from "@react-md/typography";

export default forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div {...props} ref={ref}>
      <Text type="headline-4">Page 3</Text>
      <Text>
        Donec lacinia velit ac est finibus malesuada. Mauris arcu dui, euismod
        quis erat et, iaculis molestie orci. Nullam efficitur felis non feugiat
        tincidunt. Etiam sed tellus eu nunc fermentum vestibulum. Integer
        maximus iaculis fringilla. Donec tincidunt mauris quis iaculis volutpat.
        Ut tempor dui a nisl eleifend, non tempor ipsum condimentum. Morbi
        ultrices lectus a feugiat fringilla. Morbi ornare vehicula lorem, eu
        consectetur augue tristique sit amet. Vestibulum fringilla auctor eros,
        at consectetur libero hendrerit id. Interdum et malesuada fames ac ante
        ipsum primis in faucibus.
      </Text>
    </div>
  )
);
