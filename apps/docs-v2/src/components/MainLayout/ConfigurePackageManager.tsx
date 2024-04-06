import {
  PACKAGE_MANAGERS,
  usePackageManagerContext,
} from "@/components/PackageManagerProvider.jsx";
import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import { type ReactElement } from "react";

export function ConfigurePackageManager(): ReactElement {
  const { packageManager, setPackageManager } = usePackageManagerContext();
  return (
    <SegmentedButtonGroup
      label="Package Manager"
      items={PACKAGE_MANAGERS}
      value={packageManager}
      setValue={setPackageManager}
    />
  );
}
