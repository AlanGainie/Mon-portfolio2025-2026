import React from 'react';
import MonCV from '../MonCV';
import CurriculumVitae from './CurriculumVitae.tsx';

function AproposDeMoi() {
    return (
        <>
            <h1>A propos de moi.</h1>
            <p>Afin de débuter comme il se dois je me présente :</p>
            <img alt="html image example" src="../src/assets/picture/description.png" />
            <p>
                J’aime la créativité et je me suis fixé comme objectif d’en savoir toujours plus, jour après jour dans le domaine du développement informatique qui me passionne.
                Vous voulez en savoir plus. Je vous propose ainsi de débuter par une marque de prestance à l’époque Antique mon :
                <span
                    onClick={() => {
                        { monCVTab[1] }
                    }}
                    className="text-blue-600 cursor-pointer underline"
                >
                    Curriculum Vitae
                </span>.
            </p >
        </>
    )
}

export default AproposDeMoi