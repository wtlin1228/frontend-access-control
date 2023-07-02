import { useEffect, useMemo } from "react";
import type { AccessControl, ModuleName, Rule } from "./type";
import useModuleQuery from "./useModuleQuery";
import { AccessControlContext } from "./context";
import {
  validateAccessControlWithUserModules,
  validateRuleWithAccessControl,
  validateRuleWithUserModules,
} from "./validateAccessControl";
import { useNavigate } from "react-router-dom";

interface IMakeAccessControlLayout {
  accessControl: AccessControl;
  redirectToWhenValidateFail?: string;
  screenForValidateFail?: React.ReactNode;
}

export const makeAccessControlLayout = ({
  accessControl,
  redirectToWhenValidateFail,
  screenForValidateFail = (
    <div className="page">
      <h1>You can't access this page</h1>
    </div>
  ),
}: IMakeAccessControlLayout) => {
  const AccessControlLayout: React.FC<React.PropsWithChildren> = ({
    children,
  }) => {
    const { loading, data } = useModuleQuery();

    const navigate = useNavigate();

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

    // redirect to specific route if user is not allowed to see this page
    useEffect(() => {
      if (
        redirectToWhenValidateFail &&
        !validateAccessControlWithUserModules(
          accessControl,
          data as ModuleName[]
        )
      ) {
        navigate(redirectToWhenValidateFail);
      }
    }, [data, navigate]);

    if (loading) {
      return (
        <div className="page">
          <h1>Checking your permission...</h1>
        </div>
      );
    }

    if (
      !validateAccessControlWithUserModules(accessControl, data as ModuleName[])
    ) {
      if (redirectToWhenValidateFail) {
        // don't need to show the permission deny page since the user
        // has been redirect to "redirectToWhenValidateFail"
        return;
      }

      // It's the default permission deny page.
      // We can replace it with a custom one or get one from the argument.
      return screenForValidateFail;
    }

    return (
      <AccessControlContext.Provider value={value}>
        {children}
      </AccessControlContext.Provider>
    );
  };

  return AccessControlLayout;
};
