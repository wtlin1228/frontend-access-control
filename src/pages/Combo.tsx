import { useAccessControlContext } from "../AccessControl/context";

export default function Combo() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Combo Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
