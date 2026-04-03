import Carrousel from '../composants/Carrousel';
import { FLEXCOL } from '../../styles/tw';
import Crop from '../composants/Crop';

function Lycee() {
    const imagePaths = [
        '../../assets/picture/renecassin.avif',
        '../../assets/picture/artduspectacle.JPG',
        '../../assets/picture/joliocurie.jpg',
        '../../assets/picture/internat.jpeg',
    ];

    const captions = [
        'Rene cassin Montfort sur Meu',
        'Art du spectacle',
        'Lycée général et technologique Jolio Currie Rennes',
        'Internat de Jolio Currie Rennes'
    ];

    return (
        <div className={FLEXCOL}>
            <h1>Lycee.</h1>
            <Carrousel
                slides={imagePaths.map((src, index) => (
                    <Crop
                        className="h-full object-contain"
                        path={src}
                        height={500}
                        width={500}
                        errorloadtext={captions[index]}
                        key={index}/>
                ))}
                captions={captions}
                autoScroll={true}
                interval={4000}
            />
            <p>
                J'ai débuté le Lycée en seconde au lycée René Cassin à Montfort-sur-Meu.
            </p>
            <Crop path="../../assets/picture/renecassin.avif" height={500} width={500}/>
            <p>
                Ayant repris mes marques après le collège, j'ai découvert une nouvelle passion : "l'informatique". [...]
            </p>
        </div>
    );
}

export default Lycee;
