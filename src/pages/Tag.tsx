import { useAccessControlContext } from "../AccessControl/context";

export default function Tag() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Tag Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
