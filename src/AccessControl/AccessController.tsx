import { useAccessControlContext } from "./context";
import { Rule } from "./type";

interface IAccessController {
  rule: Rule;
  fallback: React.ReactNode;
}

export const AccessController: React.FC<
  React.PropsWithChildren<IAccessController>
> = ({ rule, fallback, children }) => {
  const { validateRuleWithLayoutAccessControl, validateRuleWithUserModules } =
    useAccessControlContext();

  // Don't need to validate this access control with user's modules
  // because layout will handle that. But we need to still validate
  // this access control is under the layout's access control.
  if (!validateRuleWithLayoutAccessControl(rule)) {
    throw new Error("Rule violates layout's access control.");
  }

  if (!validateRuleWithUserModules(rule)) {
    return fallback;
  }

  return children;
};
