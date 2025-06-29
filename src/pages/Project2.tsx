import React from 'react';

function Project2() {
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
            <h1>Project2: Réalisation de JDR'S.</h1>
            <p>Au lycée j'ai découvert bien des choses. Certaines d'entre elles sont devenu des passions que je garde et je chérie encore aujourd'hui.
                L'une d'entre elle est de masteriser du jeu de roll. J'ai eut la chance lors de ma vie de masteriser les JDR suivants :
                "MaldaCorp16 le commencement" qui fut mon tous premier JDR ainsi que mon tous premier JDR custum. Et si vous voulez un conseil ne débuter pas votre mastering par un JDR custum. Ont en à tous envie. Mais malheureusement c'est souvent bourré d'erreur. Même avec mon baguage actuel je me rend compte qu'il me faut bien du chemin avant de réaliser mon premier JDR custum correcte. Mon second JDR fût un JDR intense et bien plus sombre avec l'appuie du livre de la 25 ème édition de vampires la mascarade. Le JDR se nommais lors des trois campagne : "En quêt de la bête", "Vampire ; Un nouvelle age sombre", "L'hécatombe occulte"
            </p>
            <Carrousel slides={slides} captions={captions} autoScroll={false} />
        </>
    )
}

export default Project2