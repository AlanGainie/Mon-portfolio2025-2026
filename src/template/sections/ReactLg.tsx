import Crop from "../composants/Crop"
import provectio from "../../assets/picture/provectio.webp"
import node from "../../assets/picture/node.jpeg"
import tailwind from "../../assets/picture/tailwind.png"
import react from "../../assets/picture/react.png"
import atomicdesign from "../../assets/picture/atomiquedesign.jpeg"

function ReactLg() {
    return (
        <>
            <h1>React.</h1>
            <br />
            <p> COMMENT J'AI DECOUVERT REACT :
                Lors de ce début de première année en BTS SIO option SLAM, j’ai eu la chance de réaliser un stage de deux semaines, du 7 février au 21 février, et ce au profit de Provectio qui est une ESN (Entreprise de Services du Numérique) située à Rennes. Elle est spécialisée dans l'infogérance, la cybersécurité, le cloud computing et les télécommunications.
                Elle a été fondée en 2004 par Maxime Charlès dans le but d’accompagner principalement les TPE et PME du Grand Ouest de la France dans leur transformation numérique.
                <br /><br />
                <div className='flex justify-center'>
                    <Crop path={provectio} height={200} width={1200} errorloadtext="bannière provectio" legende="Provectio Rennes, entreprise d'infogérences"/>
                </div>
                <br />
                J’ai pu effectuer mon stage dans le pôle web qui comporte à ce jour seulement Guillaume Collignon mon maître de stage. Et ceux dans le SOC/NOC (lieu centralisé où les équipes informatiques peuvent surveiller en permanence les performances et la santé d'un réseau) de Provectio.
                Stage 2 (6 semaine du 10/06/2025 au 22/07/2025) —
                Lors de mon prochain stage  de première année en BTS SIO option SLAM, j’ai la chance de pouvoir de nouveau le réaliser chez Provectio. Celui-ci durera six semaines, du 10 juin au 22 juillet.
                Je l’effectuerai dans les mêmes conditions dans le pôle web qui comporte à ce jour seulement Guillaume Collignon qui sera de nouveau mon maître de stage. Et ceux dans le SOC/NOC (lieu centralisé où les équipes informatiques peuvent surveiller en permanence les performances et la santé d'un réseau) de Provectio.
            </p>
            <br />
            <p> PREMIER PAS EN REACT :
                C'est avec Provectio que j'ai fais mes premier pas avec le langage React. Aillant travailler tous d'abors sur les missions suivantes :
                - Retouche d’un dashboard de Ticketting de l’entreprise dans le SOC/NOC
                - Redesign d’un dashboard de Ticketting de l’entreprise dans le SOC/NOC
                Lors du premier jour de cette mission, j’ai pu débuter par une mise en place des systèmes réact demandés pour mon système personnel en Linux et dualboot Windows, ce qui implique l’installation de Node (pour le NPM), Vite (pour le TSX) et Tailwind (pour le CSS).
                <br />
                <div className='flex justify-center flex-wrap gap-6 my-8'>
                    <Crop path={node} height={200} width={300} errorloadtext="html image example"/>
                    <Crop path={tailwind} height={200} width={300} errorloadtext="html image example"/>
                    <Crop path={react} height={200} width={300} errorloadtext="html image example"/>
                </div>
                <br />
                Le reste de la journée j’ai pu apprendre alors les bases de React, comme les composants, la mise en forme TSX, avec l'intégration de JS dans les parties HTML du code. Ainsi que les bases de la mise en forme tailwind.
                Lors du second jour, j’ai pu mettre en place les systèmes dans un PC d’entreprise ainsi que bénéficier des accès sur leur logiciel SI (Système d’Information qui a pour but de gérer, organiser et automatiser les activités internes) et ainsi mettre en place mon second jour de formation en React avec l’apprentissage des boucles.map, de la norme atomique. J’ai aussi pu approfondir mes connaissances en Tailwind ainsi que commencer à préparer la suite de la semaine avec les projets sur le dashboard.
                À partir du jeudi jusqu'à la fin du stage, j’ai pu, avec les acquis et l'accompagnement tout le long du stage, retravailler le code du dashboard, plus spécifiquement celui du SOC/NOC. Afin d’améliorer l’interface visuelle (UI) et permettre à celle-ci d’avoir différents modes, comme le mode dashboard qui est le mode de présentation client de l’interface de ticketing. L’optimisation du code avec la suppression de code parasite l’ajout de gestion d’erreur, et ce en faisant du réusinage de code. Cela pouvait être de la gestion de données envoyées par SQLite à l’aide d’une base de données externe. À la gestion de ses données et l’affichage de celles-ci de façon mobile (de façon responsive).
            </p>
            <br />
            <p> STRUCTURE :
                J'ai pue apprendre une certaine rigeur et structure avec nottament la norme atomique qui m'a beaucoup aider à structurer mon code de mon portfolio qui est lui aussi en tsx (html,css,tailwind,javascript,json)
                Je pense que le shema suivant est sans doute le plus parlant :
                <br /><br />
                <div className='flex justify-center'>
                    <Crop path={atomicdesign} height={500} width={900} errorloadtext="html image example"/>
                </div>
            </p>
            <br />
            <p> <b>CONCLUSION :</b><br />
                J'en garde pleins de bonne expérience et souvenir. Pour moi le language react est à présent intriquement lier au language javascript (jsx) et html par l'apprentissage ainsi promulguer.
                Une par essentiel de l'apprentissage fut de m'ouvrir sur la structure de code
            </p>
        </>
    )
}

export default ReactLg