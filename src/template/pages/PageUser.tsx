import { JSX, useEffect } from "react";

import { HeaderPage, FooterPage, BodyPage } from "./Page";
import { useAuth } from "../../auth/AuthContext";

import type { PageProps } from "../../types/pageTypes";

export default function PageUser({
  header,
  footer,
  content,
  tab_menue1 = 0,
  tab_menue2,
  displaysInf = { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  enableAnchors = false,
}: PageProps): JSX.Element {
  const { user } = useAuth();

  useEffect(() => {
    document.body.dataset.page = "user";

    return () => {
      delete document.body.dataset.page;
    };
  }, []);

  return (
    <div
      className="page-user"
      data-user-role={user?.role === "demo" ? "demo" : "user"}
    >
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