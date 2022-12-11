import type { UseStateSetter } from "@react-md/core";
import type { TreeData } from "@react-md/tree";
import { createContext, useContext } from "react";

import type { Folder } from "src/constants/folders";

const context = createContext<UseStateSetter<TreeData<Folder>>>(() => {
  // do nothing
});

export const { Provider: FolderSetterProvider } = context;

export function useFolderSetter(): UseStateSetter<TreeData<Folder>> {
  return useContext(context);
}
