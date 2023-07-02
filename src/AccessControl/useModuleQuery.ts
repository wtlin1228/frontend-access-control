import { useEffect, useState } from "react";
import { ModuleName } from "./type";

let cache: null | ModuleName[] = null;

const userModules: ModuleName[] = ["core", "bp"];

export default function useModuleQuery() {
  const [queryResult, setQueryResult] = useState<{
    loading: boolean;
    data: null | ModuleName[];
  }>({ loading: !cache, data: cache });

  useEffect(() => {
    if (!cache) {
      setTimeout(() => {
        cache = userModules;
        setQueryResult({
          loading: false,
          data: userModules,
        });
      }, 2000);
    }
  }, []);

  return queryResult;
}
