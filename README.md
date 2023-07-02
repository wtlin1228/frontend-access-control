- [navbar only] A user without core module enabled shouldn't see the product / tag / printer entry.
- [route level] A user without the core or member module enabled shouldn't see the report page.
- [page level] A user without core module enabled should see fallbacks for those components requiring the core module in the report page.
- [route level] A user without a certain module should be \_\_\_ if he/she enters a page requires that certain module.
- [route level] A user with a certain module but hasn't initialized the module should be \_\_\_ if he/she enters a page requires that certain module.

- A developer adding components requiring branch purchasing module to the report page should get an error since report page only allows core and member module components.
- A developer removing the restriction of modules for a certain route should get an error if the route contains components requiring that certain module.

- layout scope

  - ex: navbar
  - code example

    ```jsx
    const NavMenu = () => {
      const { checkPolicy } = useEnabledModules();

      return (
        <nav>
          <ol>
            <!-- need to have (core || member) to see the report entry -->
            {checkPolicy([["core"], ["member"]]) && <li>report</li>}
            {checkPolicy([["core"]]) && (
              <>
                <li>product</li>
                <li>tag</li>
                <li>printer</li>
              </>
            )}
            {checkPolicy([["member"]]) && <li>member</li>}
            {checkPolicy([["bp"]]) && <li>branch purchasing</li>}
            <!-- need to have ((core && member) || (core && bp)) to see the combine entry -->
            {checkPolicy([["core", "member"], ["core", "bp"]]) && <li>combo</li>}
          </ol>
        </nav>
      );
    };
    ```

- route scope

  - ex: /report/dashboard
  - code example

    ```js
    const RequireCoreAndMemberModuleLayout = makeRequireModuleLayout({
      policy: [["core", "member"]],
      onModulesVerificationFail: () => {
        // redirect user to contract page
        // or show a "modules required" popup
      },
    });

    export default {
      "hq.report.dashboard": {
        path: "/report/dashboard",
        page: HqReportDashboardPage,
        layouts: [RequireCoreAndMemberModuleLayout],
      },
    };
    ```

- page scope

  - ex: ReportPage -> MemberReport
  - code example

    ```jsx
    const ReportPage = () => {
      return (
        <RequireModule
          policy={["member"]}
          fallback={PleaseContactUs}
          loading={Loading}
        >
          <MemberReport />
        </RequireModule>
      );
    };
    ```

Example:

```ts
type ModuleName = "core" | "member" | "bp";
type Rule = ModuleName[];
type Policy = Rule[];

const comboPolicy: Policy = [
  ["core", "member"],
  ["core", "bp"],
];

const makePolicy = (rule) => {};
```
