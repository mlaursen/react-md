import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import { usePackageManagerContext } from "@react-md/code/PackageManagerProvider";
import { type ReactElement } from "react";

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
