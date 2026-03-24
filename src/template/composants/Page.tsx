import { JSX } from "react";
import '../../styles/index.css'
import '../../styles/tw.ts';

// Pages principales
import ErrorGest from '../../template/pages/errorGest.tsx';
import Epitech from '../../template/pages/Epitech.tsx';
import AproposDeMoi from '../../template/pages/AproposDeMoi.tsx';
import CurriculumVitae from '../../template/pages/CurriculumVitae.tsx';
import ESMA from '../../template/pages/ESMA.tsx';
import ESUP from '../../template/pages/ESUP.tsx';
import Gmail from '../../template/pages/Gmail.tsx';
import Introduction from '../../template/pages/Introduction.tsx';
import NodeJs from '../../template/pages/NodeJs.tsx';
import JavaScript from '../../template/pages/JavaScript.tsx';
import Lycee from '../../template/pages/Lycee.tsx';
import Sommaire from '../../template/pages/Sommaire.tsx';
import ReactLg from '../../template/pages/ReactLg.tsx';
import Others from '../../template/pages/Others.tsx';
import Project1 from '../../template/pages/Project1.tsx';
import Project2 from '../../template/pages/Project2.tsx';
import LanguageC from '../../template/pages/C.tsx';

// Styles utilitaires
import { DOWNPAGESCROLLDOWN, FOOTER } from '../../styles/tw.ts';

// Pages des sous-menus
const homePageTab = [<Introduction />, <Sommaire />];
const monCVTab = [<AproposDeMoi />, <CurriculumVitae />];
const mesCompetencesTab = [<JavaScript />, <ReactLg />, <NodeJs />, <LanguageC />];
const projetsTab = [<Project1 />, <Project2 />];
const mesEtudesTab = [<Lycee />, <Epitech />, <ESMA />, <ESUP />];
const contactsTab = [<ErrorGest name="pages" />, <Gmail />, <ErrorGest name="pages" />, <Others />];

type DisplaysInf = { displayFirstMenuIndex: number; displaySecondMenuIndex: number };

// Affiche les sous-pages selon le menu sélectionné
function displaySousMenue(tab: number, displaysInf: DisplaysInf): JSX.Element {
  displaysInf.displaySecondMenuIndex = tab;

  const pagesArrays = [
    homePageTab,
    monCVTab,
    mesCompetencesTab,
    projetsTab,
    mesEtudesTab,
    contactsTab,
  ];

  const selectedArray = pagesArrays[displaysInf.displayFirstMenuIndex] ?? [];
  return selectedArray[tab] ?? <ErrorGest name="page" />;
}

// Header
const HeaderPage = ({ content }: { content?: JSX.Element }): JSX.Element => {
  if (content) return content;

  // Placeholder simple, à remplacer par react-helmet si besoin
  return <header />;
}

// Footer
export const FooterPage = ({ content }: { content?: JSX.Element }): JSX.Element => {
  if (content) return content;

  return (
    <footer className={FOOTER}>
      <p>© 2025 Alan Gainie - Tous droits réservés</p>
      <nav>
        <a href="/mentions-legales">Mentions légales</a> | 
        <a href="/confidentialite">Confidentialité</a>
      </nav>
    </footer>
  );
}

// Sous-menu
function SousMenue({ tab_menue1, displaysInf }: { tab_menue1: number, displaysInf: DisplaysInf }): JSX.Element {
  return (
    <>
      <hr />
      <div className={DOWNPAGESCROLLDOWN}>
        {displaySousMenue(tab_menue1, displaysInf)}
      </div>
    </>
  );
}

// Corps de page
const BodyPage = ({ content, tab_menue1, tab_menue2, displaysInf }: 
  { content?: JSX.Element, tab_menue1: number, tab_menue2?: number, displaysInf?: DisplaysInf }): JSX.Element => {

  if (content) return content;

  if (tab_menue2 !== undefined && displaysInf) {
    return <SousMenue tab_menue1={tab_menue1} displaysInf={displaysInf} />;
  }

  // Fallback si pas de sous-menu
  return displaySousMenue(tab_menue1, displaysInf ?? { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 });
}

// Composant Page principal
function Page({
  header,
  footer,
  content,
  tab_menue1 = 0,
  tab_menue2,
  displaysInf = { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  // type
}: {
  header?: JSX.Element | "none",
  footer?: JSX.Element | "none",
  content?: JSX.Element,
  tab_menue1?: number,
  tab_menue2?: number,
  displaysInf?: DisplaysInf,
  type?: string
}): JSX.Element {

  return (
    <div>
      {(header !== "none") && <HeaderPage content={header} />}
      <BodyPage content={content} tab_menue1={tab_menue1} tab_menue2={tab_menue2} displaysInf={displaysInf} />
      {(footer !== "none") && <FooterPage content={footer} />}
    </div>
  );
}

export default Page;
