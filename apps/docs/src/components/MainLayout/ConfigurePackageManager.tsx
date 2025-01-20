import { usePackageManagerContext } from "@react-md/code/PackageManagerProvider";
import { type ReactElement } from "react";

import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";

export function ConfigurePackageManager(): ReactElement {
  const { packageManager, packageManagers, setPackageManager } =
    usePackageManagerContext();

  return (
    <SegmentedButtonGroup
      label="Package Manager"
      items={packageManagers}
      value={packageManager}
      setValue={setPackageManager}
    />
  );
}
