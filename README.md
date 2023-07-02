# Design Overview

![fe-access-control](fe-access-control.png)

# User Stories

- [menu level] A user without core module enabled shouldn't see the product / tag / printer entry.
- [page level] A user without core module enabled should see fallbacks for those components requiring the core module in the report page.
- [route level] A user without the core or member module enabled shouldn't see the report page.
- [route level] A user without a certain module should be \_\_\_ if he/she enters a page requires that certain module.
- [route level] A user with a certain module but hasn't initialized the module should be \_\_\_ if he/she enters a page requires that certain module.

- [developer experience] A developer adding components requiring branch purchasing module to the report page should get an error since report page only allows core and member module components.
- [developer experience] A developer removing the restriction of modules for a certain route should get an error if the route contains components requiring that certain module.

# Implementation Detail

## Menu Level

`getShouldBeVisible` accepts `AccessControl` and return whether should this menu item be visible or not.

```tsx
export const Menu = () => {
  const getShouldBeVisible = useMenuVisibility();

  return (
    <nav>
      <ul>
        {getShouldBeVisible([["core"], ["member"]]) && (
          <li>
            <Link to="/report">Report</Link>
          </li>
        )}

        {getShouldBeVisible([["core"]]) && (
          <>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/tag">Tag</Link>
            </li>
            <li>
              <Link to="/printer">Printer</Link>
            </li>
          </>
        )}

        {getShouldBeVisible([
          ["core", "member"],
          ["core", "bp"],
        ]) && (
          <li>
            <Link to="/combo">Combo</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

## Route Level

`makeAccessControlLayout` can create different layouts with the specific `AccessControl`. We can also redirect user to another route by giving `redirectToWhenValidateFail` or show the fallback screen by giving `screenForValidateFail`.

```tsx
const RequireCoreMemberModulesLayout = makeAccessControlLayout({
  accessControl: [["core"], ["member"]],
});
const RequireCoreModuleLayout = makeAccessControlLayout({
  accessControl: [["core"]],
});
const RequireMemberModuleLayout = makeAccessControlLayout({
  accessControl: [["member"]],
  screenForValidateFail: (
    <div className="page">
      <h1>Sorry, please upgrade your plan</h1>
    </div>
  ),
});
const RequireBpModuleLayout = makeAccessControlLayout({
  accessControl: [["bp"]],
});
const ComboAccessControlLayout = makeAccessControlLayout({
  accessControl: [
    ["core", "member"],
    ["core", "bp"],
  ],
  redirectToWhenValidateFail: "/",
});
```

## Page Level

We can use `AccessController` as a HOC that can handle both access control validation and fallback. But the best part of `AccessController` is it can prevent us from unintentionally making the conflict between route level's and page level's access control policy.

```tsx
<AccessController
  rule={["core"]}
  fallback={
    <ReportSection>enable core module to see core report</ReportSection>
  }
>
  <ReportSection>Core Report</ReportSection>
</AccessController>
```

I recommend only using `AccessController` inside your page when the route level's access control has more than one rule.

# Try Yourself

1. clone this repo
2. `npm install`
3. `npm run dev`

![demo](demo.png)
