import { createContext, useContext } from "react";
import { Rule } from "./type";

interface IAccessControlContext {
  accessControl: string;
  validateRuleWithLayoutAccessControl: (rule: Rule) => boolean;
  validateRuleWithUserModules: (rule: Rule) => boolean;
}

export const AccessControlContext = createContext<null | IAccessControlContext>(
  null
);

export const useAccessControlContext = (): IAccessControlContext => {
  const context = useContext(AccessControlContext);

  if (context === null) {
    throw new Error("AccessControlContext.Provider not found");
  }

  return context;
};
