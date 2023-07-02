import { useMemo } from "react";
import type { AccessControl, ModuleName } from "./type";
import useModuleQuery from "./useModuleQuery";
import { AccessControlContext } from "./context";
import validateAccessControl from "./validateAccessControl";

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
      }),
      []
    );

    if (loading) {
      return (
        <div className="page">
          <h1>Loading...</h1>
        </div>
      );
    }

    if (!validateAccessControl(data as ModuleName[], accessControl)) {
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
