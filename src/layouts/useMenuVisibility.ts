import { useCallback } from "react";
import { AccessControl } from "../AccessControl/type";
import useModuleQuery from "../AccessControl/useModuleQuery";
import { validateAccessControlWithUserModules } from "../AccessControl/validateAccessControl";

export const useMenuVisibility = () => {
  const { data } = useModuleQuery();

  const getShouldBeVisible = useCallback(
    (accessControl: AccessControl): boolean => {
      if (!data) {
        return false;
      }

      return validateAccessControlWithUserModules(accessControl, data);
    },
    [data]
  );

  return getShouldBeVisible;
};

export default useMenuVisibility;
