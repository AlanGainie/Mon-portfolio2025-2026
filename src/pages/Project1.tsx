import React from 'react';
import Carrousel from '../Carrousel.tsx';

function Project1() {
    const slides = [
        <embed
            key="sql-learn"
            src="assets/pdf/SQL-learn.pdf"
            type="application/pdf"
            width="100%"
            height="300px"
            className="rounded border"
        />,
        <embed
            key="cejm-puzzle"
            src="assets/pdf/Chartre graphique - Dossier PDF/Typos/Typos.pdf"
            type="application/pdf"
            width="100%"
            height="300px"
            className="rounded border"
        />,
        <embed
            key="cge-cadavre"
            src="assets/pdf/Chartre graphique - Dossier PDF/Typos/Typos.pdf"
            type="application/pdf"
            width="100%"
            height="300px"
            className="rounded border"
        />,
    ];

    const captions = [
        "SQL-learn by gamesociaty",
        "CEJM puzzle graph",
        "CGE cadavre esqui storryboard",
    ];

    return (
        <>
            <h1>Project 1: Réalisation de fiches de révisions.</h1>
            <p>
                Tout le monde a sa méthode pour apprendre. Voici quelques-unes de mes fiches de révision ludiques :
            </p>
            <Carrousel slides={slides} captions={captions} autoScroll={false} />
            <h2>SQL learn by game sociaty</h2>
            <p>Depuis petit je suis passioner de jeux de sociéter. J'ai jouer à nombre de jeux que se soit des jeux de cartes à jouer comme pokemon, des jeux de carte comme Dominion, des jeux de plateau comme Elisium. Les jeux de sociéter font toujours parties de mes passions mais eux aussi ont évoluer avec le temps. Passant des petits jeux au jeux comme civilisation, timestorry ou site (4X) donc plutôt prévu pour les initiers. Toutefois avec les études supérieur j'avait un peu perdu cette passion du jeu. J'étais partis plus sur des passions plus courte et moins honnéreuse en temps comme la guitare ou le déssin. J'ai eut la chance en se début d'anné 2025 de découvrir l'association Antijeux de Rennes afin de reprendre cette passion d'enfance.

                "Je pense qu'au fond de nous, nous ne devons pas oublié l'enfance qui à tracer notre route."
            </p>
            <p>
                J'ai coutume de dire que j'ai choisi de partir dans l'informatique car c'est magique et qu'on peu tous y faire. Mais cette magie viens et prend vie dans des projets comme celui-ci.
                Le projet de créations de jeu de sociéter pour faire des fiches de révision SQL fût le premier de ma série de fiche de révision informatique. J'étais partie sur l'idéer qu'il me fallais créer des fiches de révisions qui me resemblent.
                Je sais bien qu'a chaque fois que je préparais des fiches de révision je ne les lisais jamais car elles n'avait rien d'attrayant. C'est alors que j'ai souhaiter les inscrires dans des univers distinct et qui fond le pont avec des projets que j'ai dérière. Dans cette dynamique elles me motiverai, serrai relisible et dévelope un projet et de la rêverie.
                Je crois en la ludo éducation. Il ne tiens à présent à chacun de créer sa méthode d'aprentissage ludique. ^^
            </p>
            <h2>CEJM puzzle graph</h2>
            <p>
                A l'image de l'anglais la CEJM est une matière que je trouvent intéréssente mais qui ne me parlent pas.. Pas dans le sens que je ne vois pas d'intérêt concret à cette matière mais plutôt dans le sens que je n'arrive pas à l'assimiler.
                J'ai eut la chance d'avoir quelques conseille de collègues de ma classe sur le sujet afin de rajouter une fiche de méthode à la CEJM qui reprend les bases de la CGE.
            </p>
            <h2>CGE cadavre esqui storyboard</h2>
        </>
    );
}

export default Project1;
