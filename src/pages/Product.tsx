import { useAccessControlContext } from "../AccessControl/context";

export default function Product() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Product Page</h1>
      <h2>Access control: {accessControl}</h2>
    </div>
  );
}
