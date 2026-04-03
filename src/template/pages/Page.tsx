import { JSX, useEffect, useRef } from "react";
import "../../styles/index.css";
import "../../styles/tw.ts";

// Pages principales
import ErrorState from "../sections/errorGest.tsx";
import Epitech from "../sections/Epitech.tsx";
import AproposDeMoi from "../sections/AproposDeMoi.tsx";
import ESMA from "../sections/ESMA.tsx";
import ESUP from "../sections/ESUP.tsx";
import Gmail from "../sections/Gmail.tsx";
import HomePage from "../sections/HomePage.tsx";
import NodeJs from "../sections/NodeJs.tsx";
import JavaScript from "../sections/JavaScript.tsx";
import Lycee from "../sections/Lycee.tsx";
import Sommaire from "../sections/Sommaire.tsx";
import ReactLg from "../sections/ReactLg.tsx";
import Others from "../sections/Others.tsx";
import Project1 from "../sections/Project1.tsx";
import Project2 from "../sections/Project2.tsx";
import LanguageC from "../sections/C.tsx";

// Sous-composants de page
import PageHome from "./PageHome";
import PageUser from "./PageUser";
import PageAdmin from "./PageAdmin";

// Styles utilitaires
import { PAGESCROLLDOWN, FOOTER } from "../../styles/tw.ts";

export type DisplaysInf = {
  displayFirstMenuIndex: number;
  displaySecondMenuIndex: number;
};

export type AdministrativeContent = {
  description?: string;
  pdf?: string;
  slides?: string;
  image?: string;
  folder?: string;
};

export type PageProps = {
  header?: JSX.Element | "none";
  footer?: JSX.Element | "none";
  content?: JSX.Element;
  tab_menue1?: number;
  tab_menue2?: number;
  displaysInf?: DisplaysInf;
  type?: "home" | "user" | "admin";
  enableAnchors?: boolean;
  showAdministrativeSection?: boolean;
  administrativeContent?: AdministrativeContent;
};

function getPagesArrays(): JSX.Element[][] {
  const homePageTab = [<HomePage key="home" />, <Sommaire key="sommaire" />];

  const monCVTab = [
    <AproposDeMoi key="apropos" />,
    <ErrorState key="cv-error" type="not_found" target="page" />,
  ];

  const mesCompetencesTab = [
    <JavaScript key="js" />,
    <ReactLg key="react" />,
    <NodeJs key="node" />,
    <LanguageC key="c" />,
  ];

  const projetsTab = [<Project1 key="project1" />, <Project2 key="project2" />];

  const mesEtudesTab = [
    <Lycee key="lycee" />,
    <Epitech key="epitech" />,
    <ESMA key="esma" />,
    <ESUP key="esup" />,
  ];

  const contactsTab = [
    <ErrorState key="contact-error-1" type="not_found" target="page" />,
    <Gmail key="gmail" />,
    <ErrorState key="contact-error-2" type="not_found" target="page" />,
    <Others key="others" />,
  ];

  return [
    homePageTab,
    monCVTab,
    mesCompetencesTab,
    projetsTab,
    mesEtudesTab,
    contactsTab,
  ];
}

export function displaySousMenue(
  tab: number,
  displaysInf: DisplaysInf
): JSX.Element {
  const pagesArrays = getPagesArrays();
  const selectedArray = pagesArrays[displaysInf.displayFirstMenuIndex] ?? [];
  return selectedArray[tab] ?? <ErrorState type="not_found" target="page" />;
}

export const HeaderPage = ({
  content,
}: {
  content?: JSX.Element;
}): JSX.Element => {
  if (content) return content;
  return <header />;
};

export const FooterPage = ({
  content,
}: {
  content?: JSX.Element;
}): JSX.Element => {
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

export const BodyPage = ({
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
  showAdministrativeSection?: boolean;
  administrativeContent?: AdministrativeContent;
}): JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const safeDisplaysInf: DisplaysInf = displaysInf ?? {
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
        target = container.querySelector<HTMLElement>(
          `#${CSS.escape(targetId)}`
        );
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
        <SousMenue
          tab_menue1={tab_menue1}
          displaysInf={displaysInf}
        />
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className={PAGESCROLLDOWN}>
      {displaySousMenue(tab_menue1, safeDisplaysInf)}
    </div>
  );
};

function Page(props: PageProps): JSX.Element {
  const { type = "user" } = props;

  switch (type) {
    case "home":
      return <PageHome {...props} />;
    case "admin":
      return <PageAdmin {...props} />;
    case "user":
    default:
      return <PageUser {...props} />;
  }
}

export default Page;