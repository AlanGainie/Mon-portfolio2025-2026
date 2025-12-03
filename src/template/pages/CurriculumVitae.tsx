import CV1 from '../../assets/picture/CV alternance 2025 alan gainie.jpg';
import CV2 from '../../assets/picture/CV alternance 2025 alan gainie styliser.jpg';
import CV3 from '../../assets/pdf/CV alternance 2025 alan gainie.pdf';
import Crop from '../composants/Crop';
import Carrousel from '../composants/Carrousel';

// TODO: Mettre en place des images justifier dans le carrouselle
function CurriculumVitae() {
    return (
        <>
            <h1>En savoir plus sur le candidat.</h1>
            <h1>Ici vous retrouverer mon CV.</h1>
            <Carrousel
                slides={
                    [<Crop path={CV1} height={300} width={500} errorloadtext="html image example"/>,
                    <Crop path={CV2} height={300} width={500} errorloadtext="html image example"/>,
                    <Crop path={CV3} height={300} width={500} errorloadtext="html image example"/>]
                }/>
        </>
    )
}

export default CurriculumVitae