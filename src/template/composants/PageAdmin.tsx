import { JSX, useState } from "react";
import {
  HeaderPage,
  FooterPage,
  BodyPage,
  PageProps,
  AdministrativeContent,
} from "./Page";

import AdministrativeEditor from "./AdministrativeEditor";

export default function PageAdmin({
  header,
  footer,
  content,
  tab_menue1 = 0,
  tab_menue2,
  displaysInf = { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  enableAnchors = false,
  showAdministrativeSection = true,
  administrativeContent,
}: PageProps): JSX.Element {
  const [adminContent, setAdminContent] = useState<AdministrativeContent>(
    administrativeContent ?? {}
  );

  return (
    <div>
      {header !== "none" && <HeaderPage content={header} />}

      {/* 🔧 Éditeur admin */}
      <AdministrativeEditor
        initialContent={adminContent}
        onSave={(updatedContent) => setAdminContent(updatedContent)}
      />

      {/* 📄 Contenu de la page */}
      <BodyPage
        content={content}
        tab_menue1={tab_menue1}
        tab_menue2={tab_menue2}
        displaysInf={displaysInf}
        enableAnchors={enableAnchors}
        showAdministrativeSection={showAdministrativeSection}
        administrativeContent={adminContent}
      />

      {footer !== "none" && <FooterPage content={footer} />}
    </div>
  );
}