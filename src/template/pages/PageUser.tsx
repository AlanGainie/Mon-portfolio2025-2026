import { JSX } from "react";
import { HeaderPage, FooterPage, BodyPage, PageProps } from "./Page";

export default function PageUser({
  header,
  footer,
  content,
  tab_menue1 = 0,
  tab_menue2,
  displaysInf = { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  enableAnchors = false,
}: PageProps): JSX.Element {
  return (
    <div className="page-user">
      {header !== "none" && <HeaderPage content={header} />}

      <BodyPage
        content={content}
        tab_menue1={tab_menue1}
        tab_menue2={tab_menue2}
        displaysInf={displaysInf}
        enableAnchors={enableAnchors}
      />

      {footer !== "none" && <FooterPage content={footer} />}
    </div>
  );
}