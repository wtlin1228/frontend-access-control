import { useAccessControlContext } from "../AccessControl/context";

export default function Printer() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Printer Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
