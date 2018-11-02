/**
 * This is an exported type alias from a file. So normally something like
 * ButtonWithDefaultProps or custom unions.
 */
interface ITypeDocExportedType {
  /**
   * The name of the type. This is also used for lookups.
   */
  name: string;
  comment: string;
  value: string;
}

interface ITypeDocExportedTypeDB {
  [typeName: string]: ITypeDocExportedType;
}
interface ITypeDocPackage {
  exportedTypes: ITypeDocExportedTypeDB;
}

interface ITypeDocPackageDB {
  [packageName: string]: ITypeDocPackage;
}

interface ITypeDocDB {
  packages: ITypeDocPackageDB;
  // externals: ITypeDocPackageDB;
}
