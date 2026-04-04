import Epitech from "../src/template/sections/Epitech.tsx";
import AproposDeMoi from "../src/template/sections/AproposDeMoi.tsx";
import ESMA from "../src/template/sections/ESMA.tsx";
import ESUP from "../src/template/sections/ESUP.tsx";
import Gmail from "../src/template/sections/Gmail.tsx";
import Introduction from "../src/template/sections/Introduction.tsx";
import NodeJs from "../src/template/sections/NodeJs.tsx";
import JavaScript from "../src/template/sections/JavaScript.tsx";
import Lycee from "../src/template/sections/Lycee.tsx";
import Sommaire from "../src/template/sections/Sommaire.tsx";
import ReactLg from "../src/template/sections/ReactLg.tsx";
import Others from "../src/template/sections/Others.tsx";
import Project1 from "../src/template/sections/Project1.tsx";
import Project2 from "../src/template/sections/Project2.tsx";
import LanguageC from "../src/template/sections/C.tsx";

// Pages
import MesEtudes from "../src/template/sections/MesEtudes.tsx";
import Projets from "../src/template/sections/Projets.tsx";
import Contacts from "../src/template/sections/Contacts.tsx";
import ErrorState from "../src/template/sections/errorGest.tsx";

export enum MenueDefinedTypePage {
  Ancre = "ancre",
  MultiPages = "multi-pages",
}

export const OnlyOnedMenue = {
  names: [
    "Home page",
    "À propos de moi/CV",
    "Mes Competences",
    "Projets",
    "Mes Etudes",
    "Contact",
  ],
  icones: ["home", "cv", "competence", "projet", "etudes", "contact"],
  sections: [
    <Introduction />,
    <ErrorState type="not_found" target="page" />,
    <AproposDeMoi />,
    <Projets />,
    <MesEtudes />,
    <Contacts />,
  ],
  className: ["", "", "", "", "", ""],
};

export const MultipliedMenues = [
  {
    index: 0,
    names: ["Introduction", "Sommaire"],
    icones: ["", ""],
    sections: [<Introduction />, <Sommaire />],
    className: ["", ""],
  },
  {
    index: 1,
    names: ["A propos de moi", "Curriculum Vitae"],
    icones: ["personal", "cv"],
    sections: [<AproposDeMoi />, <ErrorState type="not_found" target="page" />],
    className: ["", ""],
  },
  {
    index: 2,
    names: ["JavaScript", "React", "Node.js", "C"],
    icones: ["js", "react", "node", "c"],
    sections: [<JavaScript />, <ReactLg />, <NodeJs />, <LanguageC />],
    className: ["", "", "", ""],
  },
  {
    index: 3,
    names: ["Projet1", "Projet2"],
    icones: ["revision", "jdr"],
    sections: [<Project1 />, <Project2 />],
    className: ["", ""],
  },
  {
    index: 4,
    names: ["Lycée", "Epitech", "ESMA", "ESUP"],
    icones: ["", "", "", ""],
    sections: [<Lycee />, <Epitech />, <ESMA />, <ESUP />],
    className: ["", "", "", ""],
  },
  {
    index: 5,
    names: ["Linkedin", "Gmail", "Téléphone", "..."],
    icones: ["linkedin", "at", "contact", "more"],
    sections: [
      <ErrorState type="not_found" target="page" />,
      <Gmail />,
      <ErrorState type="not_found" target="page" />,
      <Others />,
    ],
    className: ["", "", "", ""],
  },
];