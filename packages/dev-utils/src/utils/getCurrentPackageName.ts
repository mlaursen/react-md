import getPackageJson from "./getPackageJson";

/**
 *
 * @param stripped Boolean if the package name should not have the leading `@react-md/`
 * returned.
 * @return the package name or an empty string
 */
export default function getCurrentPackageName(
  stripped: boolean = true
): string {
  if (!/packages\/[a-z]+(-[a-z]+)*$/.test(process.cwd())) {
    return "";
  }

  const { name } = getPackageJson();
  if (stripped) {
    return name.substring(name.lastIndexOf("/") + 1);
  }

  return name;
}
