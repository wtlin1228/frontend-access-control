import { AccessControl, ModuleName, Rule } from "./type";

export function validateAccessControlWithUserModules(
  accessControl: AccessControl,
  userModules: ModuleName[]
): boolean {
  return accessControl.some((rule) => {
    const isRuleCoveredByUserModules = !rule.some(
      (moduleName) => !userModules.includes(moduleName)
    );
    return isRuleCoveredByUserModules;
  });
}

export function validateRuleWithAccessControl(
  accessControl: AccessControl,
  requiredModules: Rule
): boolean {
  return accessControl.some((rule) => {
    const isRequiredModulesCoveredByRule = !requiredModules.some(
      (moduleName) => !rule.includes(moduleName)
    );
    return isRequiredModulesCoveredByRule;
  });
}

export function validateRuleWithUserModules(
  rule: Rule,
  userModules: ModuleName[]
): boolean {
  return !rule.some((module) => !userModules.includes(module));
}
