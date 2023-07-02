import { AccessController } from "../AccessControl/AccessController";
import { useAccessControlContext } from "../AccessControl/context";

const ReportSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="report-section">{children}</div>
);

export default function Report() {
  const { accessControl } = useAccessControlContext();

  return (
    <div className="page">
      <h1>Report Page</h1>
      <h2>Access control: {accessControl}</h2>

      <AccessController
        rule={["core"]}
        fallback={
          <ReportSection>enable core module to see core report</ReportSection>
        }
      >
        <ReportSection>Core Report</ReportSection>
      </AccessController>

      <AccessController
        rule={["member"]}
        fallback={
          <ReportSection>enable core module to see member report</ReportSection>
        }
      >
        <ReportSection>Member Report</ReportSection>
      </AccessController>

      {/* <AccessController
        rule={["bp"]}
        fallback={
          <ReportSection>enable core module to see bp report</ReportSection>
        }
      >
        <ReportSection>Branch Purchase Report</ReportSection>
      </AccessController> */}
    </div>
  );
}
