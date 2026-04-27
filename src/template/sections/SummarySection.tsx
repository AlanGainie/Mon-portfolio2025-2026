// import MenueData from '../../../datas/Menue.json'
// import React from 'react';

import SectionTitle from "../sections/shared/TitleSection";

import type { SummaryLink } from "../../types/pageTypes";

// function convert_composant_to_name_string(component: any): string {
//     // Si c'est un élément JSX, on récupère le type (la fonction)
//     const comp = component?.type || component;

//     // Récupère displayName si défini, sinon name, sinon "AnonymousComponent"
//     if (comp?.displayName) return comp.displayName;
//     if (comp?.name) return comp.name;

//     // Si c'est un élément React simple (string, Fragment, etc.)
//     if (typeof comp === 'string') return comp;

//     return "AnonymousComponent";
// }

// function Sommaire() {
//     return (
//         <>
//             <h1>
//                 <u>Sommaire</u>
//             </h1>

//             <p>
//                 Dans ce document vous retrouverez différentes parties explicatives sur le candidat :
//                 <br /><br />

//                 {MenueData.sections.map((section) => (
//                     <React.Fragment key={section.id}>
//                         - {section.label}
//                         <br />
//                     </React.Fragment>
//                 ))}
//             </p>
//         </>
//     );
// }

type SummarySectionProps = {
  summaryLinks: SummaryLink[];
};

function SummarySection({ summaryLinks }: SummarySectionProps) {
  return (
    <section id="sommaire" className="home-panel">
      <SectionTitle
        eyebrow="Navigation"
        title="Sommaire du projet"
        subtitle="Chaque section possède une ancre pour être facilement accessible depuis le menu du portfolio."
      />

      <div className="home-summary-grid">
        {summaryLinks.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} className="home-summary-card">
            <p className="home-summary-index">Section {index + 1}</p>
            <h3 className="home-summary-title">{item.label}</h3>
            <p className="home-summary-text">
              Accéder directement à cette partie du portfolio.
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default SummarySection;