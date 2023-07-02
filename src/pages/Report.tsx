import { useAccessControlContext } from "../AccessControl/context";

export default function Report() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Report Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
