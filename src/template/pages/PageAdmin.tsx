import { JSX } from "react";

import {
  HeaderPage,
  FooterPage,
  BodyPage,
} from "./Page";

import type {
  PageProps,
  AdministrativeContent,
} from "../../types/pageTypes";

type PageAdminProps = PageProps & {
  showAdministrativeSection?: boolean;
  administrativeContent?: AdministrativeContent;
};

export default function PageAdmin({
  header,
  footer,
  content,
  tab_menue1 = 0,
  tab_menue2,
  displaysInf = { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  enableAnchors = false,
  showAdministrativeSection = false,
  administrativeContent,
}: PageAdminProps): JSX.Element {
  return (
    <div>
      {header !== "none" && <HeaderPage content={header} />}

      <BodyPage
        content={content}
        tab_menue1={tab_menue1}
        tab_menue2={tab_menue2}
        displaysInf={displaysInf}
        enableAnchors={enableAnchors}
      />

      {showAdministrativeSection && administrativeContent && (
        <section
          style={{
            width: "min(1100px, 92%)",
            margin: "24px auto 0 auto",
            padding: "24px",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            background: "var(--bg-overlay-strong)",
            boxShadow: "var(--shadow-soft)",
            backdropFilter: "blur(12px)",
            color: "var(--text)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              Administration
            </div>

            <h2
              style={{
                margin: 0,
                textAlign: "left",
                fontSize: "2rem",
                color: "var(--text-strong)",
              }}
            >
              Dossier administratif
            </h2>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "18px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
            }}
          >
            <p
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: "var(--text-soft)",
                whiteSpace: "pre-wrap",
              }}
            >
              {administrativeContent.description ||
                "Aucun contenu administratif enregistré pour le moment."}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "18px",
            }}
          >
            {administrativeContent.pdf && administrativeContent.pdf !== "#" && (
              <a
                href={administrativeContent.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="home-action-link home-action-link-secondary"
              >
                Télécharger le PDF
              </a>
            )}

            {administrativeContent.slides &&
              administrativeContent.slides !== "#" && (
                <a
                  href={administrativeContent.slides}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-action-link home-action-link-primary"
                >
                  Voir le diaporama
                </a>
              )}

            {administrativeContent.folder &&
              administrativeContent.folder !== "#" && (
                <a
                  href={administrativeContent.folder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-action-link home-action-link-folder"
                >
                  📁 Voir le dossier
                </a>
              )}
          </div>
        </section>
      )}

      {footer !== "none" && <FooterPage content={footer} />}
    </div>
  );
}