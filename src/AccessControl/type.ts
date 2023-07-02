export type ModuleName = "core" | "member" | "bp";
// pass if match all module
export type Rule = ModuleName[];
// pass if match any rule
export type AccessControl = Rule[];
