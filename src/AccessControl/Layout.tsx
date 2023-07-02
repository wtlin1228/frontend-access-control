import { useMemo } from "react";
import type { AccessControl, ModuleName, Rule } from "./type";
import useModuleQuery from "./useModuleQuery";
import { AccessControlContext } from "./context";
import {
  validateAccessControlWithUserModules,
  validateRuleWithAccessControl,
  validateRuleWithUserModules,
} from "./validateAccessControl";

export const makeAccessControlLayout = (accessControl: AccessControl) => {
  const AccessControlLayout: React.FC<React.PropsWithChildren> = ({
    children,
  }) => {
    const { loading, data } = useModuleQuery();

    const value = useMemo(
      () => ({
        accessControl: accessControl
          .map((x) => `[${x.join(" and ")}]`)
          .join(" or "),

        validateRuleWithLayoutAccessControl: (rule: Rule) =>
          validateRuleWithAccessControl(accessControl, rule),

        validateRuleWithUserModules: (rule: Rule) =>
          validateRuleWithUserModules(rule, data as ModuleName[]),
      }),
      [data]
    );

    if (loading) {
      return (
        <div className="page">
          <h1>Loading...</h1>
        </div>
      );
    }

    if (
      !validateAccessControlWithUserModules(accessControl, data as ModuleName[])
    ) {
      return (
        <div className="page">
          <h1>You can't access this page</h1>
        </div>
      );
    }

    return (
      <AccessControlContext.Provider value={value}>
        {children}
      </AccessControlContext.Provider>
    );
  };

  return AccessControlLayout;
};
