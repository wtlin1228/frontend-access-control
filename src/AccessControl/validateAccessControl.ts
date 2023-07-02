import { AccessControl, ModuleName } from "./type";

export default function validateAccessControl(
  userModules: ModuleName[],
  accessControl: AccessControl
): boolean {
  return accessControl.some((rule) => {
    return !rule.find((moduleName) => !userModules.includes(moduleName));
  });
}
