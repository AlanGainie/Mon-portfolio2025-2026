import React from 'react';
import BarreMenue from './BarreMenue.tsx';
import './App.css';
import { useState } from 'react';

// -- Composants--------
// Pages
import TerminalLinux from './TerminalLinux';
import MonCV from './MonCV.tsx';
import MesEtudes from './MesEtudes.tsx';
import MesCompetences from './MesCompetences.tsx';
import ErrorGest from './errorGest.tsx';
import HomePage from './HomePage.tsx';
import Projets from './Projets.tsx';
import Contacts from './Contacts.tsx';
import Epitech from './pages/Epitech.tsx';
import AproposDeMoi from './pages/AproposDeMoi.tsx';
import CurriculumVitae from './pages/CurriculumVitae.tsx';
import ESMA from './pages/ESMA.tsx';
import ESUP from './pages/ESUP.tsx';
import Gmail from './pages/Gmail.tsx';
import Linkedin from './pages/Linkedin.tsx';
import Introduction from './pages/Introduction.tsx';
import NodeJs from './pages/NodeJs.tsx';
import JavaScript from './pages/JavaScript.tsx';
import Lycee from './pages/Lycee.tsx';
import Softskills from './pages/Softskills.tsx';
import Telephone from './pages/Telephone.tsx';
import Sommaire from './pages/Sommaire.tsx';
import ReactLg from './pages/ReactLg.tsx';
import Others from './pages/Others.tsx';
import Project1 from './pages/Project1.tsx';
import Project2 from './pages/Project2.tsx';

// Utilitaire
import ScrollingBarre from './ScrollingBarre.tsx';
import Carrousel from './Carrousel.tsx';

//--------


const displaysInf: { displayFirstMenuIndex: number; displaySecondMenuIndex: number }[] = [
  { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 }
];

function display(tab: number, displaysInf: any) {
  displaysInf.diplayFirstMenuIndex = tab
  switch (tab) {
    case 0:
      return <HomePage />;
    case 1:
      return <MonCV />;
    case 2:
      return <MesCompetences />;
    case 3:
      return <Projets />;
    case 4:
      return <MesEtudes />;
    case 5:
      return <Contacts />;
    default:
      return <ErrorGest name="page" />;
  }
}

function displayTab(tab: number, displaysInf: any) {
  const homePageTab = [<Introduction />, <Sommaire />]
  const monCVTab = [<AproposDeMoi />, <CurriculumVitae />]
  const mesCompetencesTab = [<JavaScript />, <ReactLg />, <NodeJs />]
  const projetsTab = [<Project1 />, <Project2 />]
  const mesEtudesTab = [<Lycee />, <Epitech />, <ESMA />, <ESUP />]
  const contactsTab = [<Linkedin />, <Gmail />, <Telephone />, <Others />]
  const prédefTab = [<HomePage />, <Softskills />]

  displaysInf.diplaySecondMenuIndex = tab
  switch (displaysInf.diplayFirstMenuIndex) {
    case 0:
      return homePageTab[tab];
    case 1:
      return monCVTab[tab];
    case 2:
      return mesCompetencesTab[tab];
    case 3:
      return projetsTab[tab];
    case 4:
      return mesEtudesTab[tab];
    case 5:
      return contactsTab[tab];
    default:
      return <ErrorGest name="page" />;
  }
}

function App() {
  const [tab_menue1, setTab1] = useState(0);
  const [tab_menue2, setTab2] = useState(0);
  const [tabs_menue1, setTabs1] = useState(['...']);
  const [tabs_menue2, setTabs2] = useState(['...']);
  const [displayFirstMenuIndex, setDisplayFirstMenuIndex] = useState<number>(0);
  const [displaySecondMenuIndex, setDisplaySecondMenuIndex] = useState<number>(0);

  const [showTerminal, setShowTerminal] = useState(false);

  const handleTab2Click = (tabIndex: number) => {
    setTab1(0);
    setTab2(tabIndex);
    switch (tabIndex) {
      case 0:
        setTabs1(["Introduction", "Sommaire"]);
        break;
      case 1:
        setTabs1(["A propos de moi", "Curriculum Vitae"]);
        break;
      case 2:
        setTabs1(["JavaScript", "React", "Node.js"]);
        break;
      case 3:
        setTabs1(["Projet1", "Projet2"]);
        break;
      case 4:
        setTabs1(["Lycée", "Epitech", "ESMA", "ESUP"]);
        break;
      case 5:
        setTabs1(["Linkedin", "Gmail", "Téléphone", "..."]);
        break;
      default:
        setTabs1(["Home page", "Softskills"]);
        break;
    }
  };

  return (
    <>
      {/* Il ne faut pas utiliser de **head** en react mais : react-helmet */}
      <head>
        <link rel="shortcut icon" href="../icone_portfolio.png" type="image/x-icon" />
      </head>
      {/* Définir une taille de fenêtre de + de 2000px pour pouvoir scroll down ou up */}
      <div className="w-full min-h-screen bg-[url('./background.jpg')] bg-fixed h-[10000px]">
        {/* Premier menu à gauche */}
        <BarreMenue
          className="fixed top-[8%] left-[1%] flex flex-col md:flex-col bg-gray-300 gap-4 rounded-lg border-yellow-500 border-7 justify-start w-70"
          setTab={setTab1}
          tabs={tabs_menue1}
        />
        {/* Second menu centré en haut */}
        <BarreMenue
          className="fixed top-[2%] left-[50%] -translate-x-1/2 flex flex-row md:flex-row bg-gray-300 gap-4 rounded-full border-yellow-500 border-7 justify-center h-10 w-[80%]"
          setTab={handleTab2Click}
          tabs={['Home page', 'À propos de moi/CV', 'Mes Competences', 'Projets', 'Mes Etudes', 'Contact']}
        />
        {/* Terminal */}
        <div className="min-h-scree text-black p-8">
          <button
            onClick={() => setShowTerminal(true)}
            className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-neutral-800 transition-colors duration-300"
          >
            Ouvrir le terminal
          </button>
          {showTerminal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="relative bg-black text-white rounded-2xl p-6 w-[680px] max-w-full shadow-2xl border border-yellow-400">
                <button
                  onClick={() => setShowTerminal(false)}
                  className="absolute top-2 right-3 text-yellow-300 text-2xl font-bold hover:text-red-500"
                >
                  ×
                </button>
                <TerminalLinux />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center w-full mt-32">
          <div className="flex flex-col w-[70%] rounded-2xl border-yellow-400 border-4 bg-white/80 backdrop-blur-md shadow-2xl gap-6">
            {/* Affiche le résultat des tab de la première barre de menu */}
            <div className="flex flex-col bg-gray-200 rounded-lg border-pink-50 border-7">
              {display(tab_menue2, displaysInf)}
            </div>
            <hr />
            {/* Affiche les résultat des tab de la seconde barre de menu */}
            <div className="flex flex-col rounded-lg border-pink-50 border-7">
              {displayTab(tab_menue1, displaysInf)}
            </div>
          </div>
        </div>
        <ScrollingBarre />
      </div >
    </>
  );
}

export default App;
