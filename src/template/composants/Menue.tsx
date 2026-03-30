import React from 'react';
import BarreMenue from '../organismes/BarreMenue.tsx';
import {
  ROOTMENUE,
  SECONDARYMENUE,
  PAGESCROLLDOWN,
  PAGESGLOBAL,
  TOPPAGESCROLLDOWN,
} from '../../styles/tw.ts';
import ErrorGest from '../pages/errorGest.tsx';

import { OnlyOnedMenue, MenueDefinedTypePage } from '../../../datas/Menue.tsx';

/**
 * Ids d’ancre utilisés par HomePage.
 * L’ordre doit correspondre à l’ordre des sections affichées dans la page d’accueil.
 */
const HOME_ANCHOR_IDS = [
  'video-intro',
  'sommaire',
  'presentation-candidat',
  'cv-carousel',
  'epreuves-e5-e6',
] as const;

type SetActualListMenue = React.Dispatch<React.SetStateAction<number>>;

/**
 * Gère le clic sur le menu.
 * - mode "multi-pages" : changement de page classique
 * - mode "ancre" : changement vers HomePage + mise à jour du hash
 */
const handleClick = (
  tabIndex: number,
  setActuallistMenue: SetActualListMenue,
  type?: MenueDefinedTypePage
) => {
  if (type === 'ancre' || type === undefined) {
    setActuallistMenue(0);

    const targetAnchor = HOME_ANCHOR_IDS[tabIndex];
    if (!targetAnchor) return;

    if (window.location.hash === `#${targetAnchor}`) {
      const target = document.getElementById(targetAnchor);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      return;
    }

    window.location.hash = targetAnchor;
    return;
  }

  setActuallistMenue(tabIndex);

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }
};

interface DisplayInfo {
  displayFirstMenuIndex: number;
  displaySecondMenuIndex: number;
}

interface ContentDefaultMenueProps {
  tab: number;
  displaysInf?: DisplayInfo[];
}

/**
 * Retourne le contenu par défaut quand on utilise le mode "page par page".
 */
export const ContentDefaultMenue: React.FC<ContentDefaultMenueProps> = ({
  tab,
  displaysInf,
}) => {
  if (displaysInf?.[0]) {
    displaysInf[0] = {
      ...displaysInf[0],
      displayFirstMenuIndex: tab,
    };
  }

  return OnlyOnedMenue.sections?.[tab] ?? (
    <ErrorGest name="Loading page failed." />
  );
};

interface ContentMenuesType {
  type?: MenueDefinedTypePage;
  actualmenue: number;
}

/**
 * Retourne le contenu selon le mode :
 * - ancre / undefined : affiche toutes les sections dans une seule page
 * - multi-pages : affiche une seule page à la fois
 */
export const ContentMenues: React.FC<ContentMenuesType> = ({
  type,
  actualmenue,
}): React.JSX.Element => {
  const displaysInf: DisplayInfo[] = [
    { displayFirstMenuIndex: 0, displaySecondMenuIndex: 0 },
  ];

  if (type === 'multi-pages') {
    return (
      <div className={PAGESCROLLDOWN}>
        <div className={PAGESGLOBAL}>
          <div className={TOPPAGESCROLLDOWN}>
            <ContentDefaultMenue tab={actualmenue} displaysInf={displaysInf} />
          </div>
        </div>
      </div>
    );
  }

  if (type === undefined || type === 'ancre') {
    if (!OnlyOnedMenue?.sections?.length) {
      return <div>Chargement…</div>;
    }

    return (
      <div className={PAGESCROLLDOWN}>
        <div className={PAGESGLOBAL}>
          {OnlyOnedMenue.sections.map((sectionContent, index) => {
            const anchorId = HOME_ANCHOR_IDS[index] ?? `section-${index}`;

            return (
              <div
                key={anchorId}
                id={anchorId}
                className={TOPPAGESCROLLDOWN}
              >
                {sectionContent}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <ErrorGest name="Loading page critical error detected." />;
};

interface MenueProps {
  content?: React.ReactNode;
  nbr?: number;
  type?: MenueDefinedTypePage;
  actual_list_menue: number;
  setActuallistMenue: SetActualListMenue;
}

/**
 * Affiche un ou plusieurs menus en gardant la feuille de style existante.
 */
export const Menue: React.FC<MenueProps> = ({
  content,
  nbr,
  type,
  actual_list_menue: _actual_list_menue,
  setActuallistMenue,
}): React.ReactNode => {
  if (content) return content;

  const menuNames = OnlyOnedMenue?.names ?? [];
  const menuIcons = OnlyOnedMenue?.icones ?? [];
  const menuSections = OnlyOnedMenue?.sections ?? [];

  return (
    <>
      {/* Premier menu à gauche */}
      <BarreMenue
        className={ROOTMENUE}
        setTab={(tabIndex: number) =>
          handleClick(tabIndex, setActuallistMenue, type)
        }
        tabs={menuNames}
        icons={menuIcons}
      />

      {/* Second menu */}
      {Number(nbr) > 1 && (
        <BarreMenue
          className={SECONDARYMENUE}
          setTab={(tabIndex: number) =>
            handleClick(tabIndex, setActuallistMenue, type)
          }
          tabs={menuSections.map((_, i) => menuNames[i] ?? `Section ${i + 1}`)}
          icons={menuSections.map((_, i) => menuIcons[i] ?? null)}
        />
      )}
    </>
  );
};

export default Menue;