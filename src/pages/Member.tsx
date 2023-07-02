import { useAccessControlContext } from "../AccessControl/context";

export default function Member() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Member Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
