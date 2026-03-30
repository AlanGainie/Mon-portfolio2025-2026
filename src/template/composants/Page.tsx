import { JSX, useEffect, useRef } from "react";
import "../../styles/index.css";
import "../../styles/tw.ts";

// Pages principales
import ErrorState from "../../template/pages/errorGest.tsx";
import Epitech from "../../template/pages/Epitech.tsx";
import AproposDeMoi from "../../template/pages/AproposDeMoi.tsx";
import ESMA from "../../template/pages/ESMA.tsx";
import ESUP from "../../template/pages/ESUP.tsx";
import Gmail from "../../template/pages/Gmail.tsx";
import HomePage from "../../template/pages/HomePage.tsx";
import NodeJs from "../../template/pages/NodeJs.tsx";
import JavaScript from "../../template/pages/JavaScript.tsx";
import Lycee from "../../template/pages/Lycee.tsx";
import Sommaire from "../../template/pages/Sommaire.tsx";
import ReactLg from "../../template/pages/ReactLg.tsx";
import Others from "../../template/pages/Others.tsx";
import Project1 from "../../template/pages/Project1.tsx";
import Project2 from "../../template/pages/Project2.tsx";
import LanguageC from "../../template/pages/C.tsx";

// Styles utilitaires
import { PAGESCROLLDOWN, FOOTER } from "../../styles/tw.ts";

// Pages des sous-menus
const homePageTab = [<HomePage />, <Sommaire />];
const monCVTab = [<AproposDeMoi />, <ErrorState type="not_found" target="page" />];
const mesCompetencesTab = [<JavaScript />, <ReactLg />, <NodeJs />, <LanguageC />];
const projetsTab = [<Project1 />, <Project2 />];
const mesEtudesTab = [<Lycee />, <Epitech />, <ESMA />, <ESUP />];
const contactsTab = [
  <ErrorState type="not_found" target="page" />,
  <Gmail />,
  <ErrorState type="not_found" target="page" />,
  <Others />,
];

type DisplaysInf = {
  displayFirstMenuIndex: number;
  displaySecondMenuIndex: number;
};

type PageProps = {
  header?: JSX.Element | "none";
  footer?: JSX.Element | "none";
  content?: JSX.Element;
  tab_menue1?: number;
  tab_menue2?: number;
  displaysInf?: DisplaysInf;
  type?: string;
  enableAnchors?: boolean;
};

function getPagesArrays() {
  return [
    homePageTab,
    monCVTab,
    mesCompetencesTab,
    projetsTab,
    mesEtudesTab,
    contactsTab,
  ];
}

// Affiche les sous-pages selon le menu sélectionné
function displaySousMenue(tab: number, displaysInf: DisplaysInf): JSX.Element {
  const pagesArrays = getPagesArrays();
  const selectedArray = pagesArrays[displaysInf.displayFirstMenuIndex] ?? [];
  return selectedArray[tab] ?? <ErrorState type="not_found" target="page" />;
}

// Header
const HeaderPage = ({ content }: { content?: JSX.Element }): JSX.Element => {
  if (content) return content;
  return <header />;
};

// Footer
export const FooterPage = ({ content }: { content?: JSX.Element }): JSX.Element => {
  if (content) return content;

  return (
    <footer className={FOOTER}>
      <p>© 2025 Alan Gainie - Tous droits réservés</p>
      <nav>
        <a href="/mentions-legales">Mentions légales</a> |{" "}
        <a href="/confidentialite">Confidentialité</a>
      </nav>
    </footer>
  );
};

// Sous-menu
function SousMenue({
  tab_menue1,
  displaysInf,
}: {
  tab_menue1: number;
  displaysInf: DisplaysInf;
}): JSX.Element {
  return (
    <>
      <hr />
      <div>{displaySousMenue(tab_menue1, displaysInf)}</div>
    </>
  );
}

// Corps de page
const BodyPage = ({
  content,
  tab_menue1,
  tab_menue2,
  displaysInf,
  enableAnchors = false,
}: {
  content?: JSX.Element;
  tab_menue1: number;
  tab_menue2?: number;
  displaysInf?: DisplaysInf;
  enableAnchors?: boolean;
}): JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const safeDisplaysInf = displaysInf ?? {
    displayFirstMenuIndex: 0,
    displaySecondMenuIndex: 0,
  };

  const anchorMode = enableAnchors || tab_menue1 === 0;

  useEffect(() => {
    if (!anchorMode) return;

    const scrollToHash = () => {
      const container = scrollContainerRef.current;
      const hash = window.location.hash;

      if (!container || !hash) return;

      const targetId = decodeURIComponent(hash.replace("#", ""));
      let target: HTMLElement | null = null;

      try {
        target = container.querySelector<HTMLElement>(`#${CSS.escape(targetId)}`);
      } catch {
        target = container.querySelector<HTMLElement>(`#${targetId}`);
      }

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const timeoutId = window.setTimeout(scrollToHash, 0);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [anchorMode, tab_menue1]);

  if (content) {
    return (
      <div ref={scrollContainerRef} className={PAGESCROLLDOWN}>
        {content}
      </div>
    );
  }

  if (tab_menue2 !== undefined && displaysInf) {
    return (
      <div ref={scrollContainerRef} className={PAGESCROLLDOWN}>
        <SousMenue tab_menue1={tab_menue1} displaysInf={displaysInf} />
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className={PAGESCROLLDOWN}>
      {displaySousMenue(tab_menue1, safeDisplaysInf)}
    </div>
  );
};

// Composant Page principal
function Page({
  header,
  footer,
  content,
  tab_menue1 = 0,
  tab_menue2,
  displaysInf = { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  enableAnchors = false,
}: PageProps): JSX.Element {
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
      {footer !== "none" && <FooterPage content={footer} />}
    </div>
  );
}

export default Page;