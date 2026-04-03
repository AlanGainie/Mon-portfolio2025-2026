import provectio from '../../assets/picture/provectio.webp';
import Crop from '../composants/Crop';

function JavaScript() {
    return (
        <>
            <h1>Javascript.</h1>
            <br />
            <p> COMMENT J'AI DECOUVERT JAVASCRIPT : <br /><br />
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
        </>
    )
}

export default JavaScript