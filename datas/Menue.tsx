import Epitech from '../src/template/pages/Epitech.tsx';
import AproposDeMoi from '../src/template/pages/AproposDeMoi.tsx';
import ESMA from '../src/template/pages/ESMA.tsx';
import ESUP from '../src/template/pages/ESUP.tsx';
import Gmail from '../src/template/pages/Gmail.tsx';
import Introduction from '../src/template/pages/Introduction.tsx';
import NodeJs from '../src/template/pages/NodeJs.tsx';
import JavaScript from '../src/template/pages/JavaScript.tsx';
import Lycee from '../src/template/pages/Lycee.tsx';
import Sommaire from '../src/template/pages/Sommaire.tsx';
import ReactLg from '../src/template/pages/ReactLg.tsx';
import Others from '../src/template/pages/Others.tsx';
import Project1 from '../src/template/pages/Project1.tsx';
import Project2 from '../src/template/pages/Project2.tsx';
import LanguageC from '../src/template/pages/C.tsx';
// Pages
import MesEtudes from '../src/template/pages/MesEtudes.tsx';
import HomePage from '../src/template/pages/HomePage.tsx';
import Projets from '../src/template/pages/Projets.tsx';
import Contacts from '../src/template/pages/Contacts.tsx';
import ErrorState from '../src/template/pages/errorGest.tsx';

export enum MenueDefinedTypePage {
    Ancre = "ancre",
    MultiPages = "multi-pages",
}

export const OnlyOnedMenue = 
{
    names: ['Home page', 'À propos de moi/CV', 'Mes Competences', 'Projets', 'Mes Etudes', 'Contact'],
    icones: ["home", "cv", "competence", "projet", "etudes", "contact"],
    sections:  [<HomePage />, <ErrorState type="not_found" target="page" />, <AproposDeMoi />, <Projets />, <MesEtudes />, <Contacts />],
    className: ["", "", "", "", ""]
};

export const MultipliedMenues = 
[
    {
        index: 0,
        names: ["Introduction", "Sommaire"],
        icones: ["", ""],
        sections: [<Introduction />, <Sommaire />],
        className: ["", ""]
    },
    {
        index: 1,
        names: ["A propos de moi", "Curriculum Vitae"],
        icones: ["personal", "cv"],
        sections: [<AproposDeMoi />, <ErrorState type="not_found" target="page" />],
        className: ["", ""]
    },
    {
        index: 2,
        names: ["JavaScript", "React", "Node.js", "C"],
        icones: ["js", "react", "node", "c"],
        sections: [<JavaScript />, <ReactLg />, <NodeJs />, <LanguageC />],
        className: ["", "", "", ""]
    },
    {
        index: 3,
        names: ["Projet1", "Projet2"],
        icones: ["revision", "jdr"],
        sections: [<Project1 />, <Project2 />],
        className: ["", ""]
    },
    {
        index: 4,
        names: ["Lycée", "Epitech", "ESMA", "ESUP"],
        icones: ["", "", "", ""],
        sections: [<Lycee />, <Epitech />, <ESMA />, <ESUP />],
        className: ["", "", "", ""]
    },
    {
        index: 5,
        names: ["Linkedin", "Gmail", "Téléphone", "..."],
        icones: ["linkedin", "at", "contact", "more"],
        sections: [<ErrorState type="not_found" target="page" />, <Gmail />, <ErrorState type="not_found" target="page" />, <Others />],
        className: ["", "", "", ""]
    }
];