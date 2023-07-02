import { AccessController } from "../AccessControl/AccessController";
import { useAccessControlContext } from "../AccessControl/context";

const ComboSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="combo-section">{children}</div>
);

export default function Combo() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Combo Page</h1>
      <h2>Access control: {accessControl}</h2>

      <AccessController
        rule={["core", "bp"]}
        fallback={
          <ComboSection>enable core & bp module to use this combo</ComboSection>
        }
      >
        <ComboSection>Core & Branch Purchase Combo</ComboSection>
      </AccessController>

      <AccessController
        rule={["core", "member"]}
        fallback={
          <ComboSection>
            enable core & member module to use this combo
          </ComboSection>
        }
      >
        <ComboSection>Core & Member Combo</ComboSection>
      </AccessController>

      {/* <AccessController
        rule={["core", "member", "bp"]}
        fallback={
          <ComboSection>
            enable core & member & bp module to use this combo
          </ComboSection>
        }
      >
        <ComboSection>Core & Member & Branch Purchase Combo</ComboSection>
      </AccessController> */}
    </div>
  );
}
