import Crop from '../composants/Crop';
import description from '../../assets/picture/description.png';
import { FLEXCOL } from '../../styles/tw';

function AproposDeMoi() {
    return (
        <>
            <h1>A propos de moi.</h1>
            <br />
            <p className="indent-[2em]">Afin de débuter comme il se dois je me présente :</p>
            <br />
            <div className={`${FLEXCOL} justify-center`}>
                <Crop path={description} height={600} width={900} errorloadtext="html image example"/>
            </div>
            <br />
            <p>
                J’aime la créativité et je me suis fixé comme objectif d’en savoir toujours plus, jour après jour dans le domaine du développement informatique qui me passionne.
                Vous voulez en savoir plus. Je vous propose ainsi de débuter par une marque de prestance à l’époque Antique mon :
                {/* <span
                    onClick={() => {
                        { monCVTab[1] }
                    }}
                    className="text-blue-600 cursor-pointer underline"
                >
                    Curriculum Vitae
                </span>. */}
            </p >
            <br />
        </>
    )
}

export default AproposDeMoi