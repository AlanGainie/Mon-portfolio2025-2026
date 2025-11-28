import BarreMenue from '../organismes/BarreMenue.tsx';
import { ROOTMENUE, SECONDARYMENUE, PAGESCROLLDOWN, PAGESGLOBAL, TOPPAGESCROLLDOWN } from '../../styles/tw.ts';
import ErrorGest from '../pages/errorGest.tsx';

import {OnlyOnedMenue, MenueDefinedTypePage} from '../../../datas/Menue.tsx'

// TODO: Finir les JS doxygene

/**
 * This var is a hook reaction when used a click in menue
 */
const handleClick = (tabIndex: number,
    setActuallistMenue: React.Dispatch<React.SetStateAction<number>>
    ) => {

    setActuallistMenue(tabIndex);
    return;
};

/**
 * The goal of this function is to return content when the menus set error
 * when I have no menue : I have default menue. Is better than UX and error
 * gest.
 * @param tab
 * @param displaysInf
 * @returns React.JSX.Element : The content have to print in page.
 */
export function ContentDefaultMenue(tab: number, displaysInf: any): React.JSX.Element {
    displaysInf.displayFirstMenuIndex = tab
    return OnlyOnedMenue.sections[tab] ?? <ErrorGest name={`Loading page \"{(String)MenueDefinedTypePage}\" fail.`} />;
}

interface ContentMenuesType {
    type?: MenueDefinedTypePage;
    actualmenue: number;
}

/**
 * The goal of this function is to return content when one or more menues
 * already existe.
 * @param type Is a choice enter differents methodes to read page:
 * - Page by ancre : type = ancre or undefined
 * - Page by page : type = multi-pages
 * @returns React.JSX.Element : The content have to print in page.
 */
export const ContentMenues: React.FC<ContentMenuesType> = ({type, actualmenue}: ContentMenuesType): React.JSX.Element => {
    const displaysInf: { displayFirstMenuIndex: number; displaySecondMenuIndex: number }[] = [
        { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 }
    ];
    if (type === "multi-pages") {
        return (
            <div className={PAGESCROLLDOWN}>
                {/* Définir une taille de fenêtre de + de 2000px pour pouvoir scroll down ou up */}
                <div className={PAGESGLOBAL}>
                    {/* Affiche le résultat des tab de la première barre de menu */}
                    <div className={TOPPAGESCROLLDOWN}>
                        {ContentDefaultMenue(actualmenue, displaysInf)}
                    </div>
                    {/* {tab_menue2 && sousMenue({ tab_menue2, displaysInf })} */}
                </div>
            </div>
        );
    } else if (type === undefined || type === "ancre") {
        return (
            <div className={PAGESGLOBAL}>
                {OnlyOnedMenue.sections.map((sectionContent, index) => (
                    <div key={index} className={TOPPAGESCROLLDOWN}>
                        {sectionContent}
                    </div>
                ))}
            </div>
        );
    } else {
        return <ErrorGest name="Loading page critical error detected."/>;
    }
};

/**
 * @type React.FC (Fonction React)
 * @param content Is a content replace menue if it enter
 * @param nbr is a number of menue and behind-menue you want
 * @returns One or more menue
 */
export const Menue = ({ content, nbr, actual_list_menue: _actual_list_menue, setActuallistMenue}:
    { content?: any, nbr?: number | undefined, actual_list_menue: number, setActuallistMenue: React.Dispatch<React.SetStateAction<number>>}): (React.ReactNode | string) => {

    if (content) return content;

    return (
        <>
            {/* Premier menu à gauche */}
            <BarreMenue
                className={ROOTMENUE}
                setTab={(tabIndex) => handleClick(tabIndex, setActuallistMenue)}
                tabs={OnlyOnedMenue.names}
                icons={OnlyOnedMenue.icones} />
            {/* Second menu */}
            {(Number(nbr) > 1) && <BarreMenue
                className={SECONDARYMENUE}
                setTab={(tabIndex) => handleClick(tabIndex, setActuallistMenue)}
                tabs={OnlyOnedMenue.sections.map((_, i) => OnlyOnedMenue.names[i])}
                icons={OnlyOnedMenue.sections.map((_, i) => OnlyOnedMenue.icones[i])} />}
        </>
    );
};