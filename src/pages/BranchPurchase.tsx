import { useAccessControlContext } from "../AccessControl/context";

export default function BranchPurchase() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>BranchPurchase Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
