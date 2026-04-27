import MenueData from '../../../datas/Menue.json'
import React from 'react';

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

function Sommaire() {
    return (
        <>
            <h1>
                <u>Sommaire</u>
            </h1>

            <p>
                Dans ce document vous retrouverez différentes parties explicatives sur le candidat :
                <br /><br />

                {MenueData.sections.map((section) => (
                    <React.Fragment key={section.id}>
                        - {section.label}
                        <br />
                    </React.Fragment>
                ))}
            </p>
        </>
    );
}

export default Sommaire;