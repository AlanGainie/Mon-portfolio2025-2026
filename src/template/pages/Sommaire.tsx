import {MultipliedMenues} from '../../../datas/Menue.tsx'
import React from 'react';

function convert_composant_to_name_string(component: any): string {
    // Si c'est un élément JSX, on récupère le type (la fonction)
    const comp = component?.type || component;

    // Récupère displayName si défini, sinon name, sinon "AnonymousComponent"
    if (comp?.displayName) return comp.displayName;
    if (comp?.name) return comp.name;

    // Si c'est un élément React simple (string, Fragment, etc.)
    if (typeof comp === 'string') return comp;

    return "AnonymousComponent";
}

function Sommaire() {
    return (
        <>
            <h1><u>Sommaire</u></h1>
            <p>
                Dans ce document vous retrouverez différentes parties explicatives sur le candidat :
                <br /><br />
                {MultipliedMenues.map((menu, menuIndex) => (
                    <span key={menuIndex}>
                        {menu.names[0] && (
                            <>
                                {menuIndex === 0
                                    ? "Home page"
                                    : menuIndex === 1
                                    ? "À propos de moi/CV"
                                    : menu.names.join(' / ')} 
                                : <br />
                            </>
                        )}
                        {menu.sections.map((section, index) => (
                            <React.Fragment key={index}>
                                - {convert_composant_to_name_string(section)} <br />
                            </React.Fragment>
                        ))}
                        <br />
                    </span>
                ))}
            </p>
        </>
    );
}

export default Sommaire