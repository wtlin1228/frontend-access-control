import { createContext, useContext } from "react";
// import { AccessControl } from "./type";

interface IAccessControlContext {
  accessControl: string;
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
