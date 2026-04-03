import React, { useEffect, useState } from 'react';
import BarreMenue from '../../organismes/BarreMenue.tsx';
import {
  ROOTMENUE,
  SECONDARYMENUE,
  PAGESCROLLDOWN,
  PAGESGLOBAL,
  TOPPAGESCROLLDOWN,
} from '../../../styles/tw.ts';
import ErrorGest from '../../sections/errorGest.tsx';

import { OnlyOnedMenue, MenueDefinedTypePage } from '../../../../datas/Menue.tsx';

const HOME_ANCHOR_IDS = [
  'video-intro',
  'sommaire',
  'presentation-candidat',
  'cv-carousel',
  'epreuves-e5-e6',
] as const;

type SetActualListMenue = React.Dispatch<React.SetStateAction<number>>;

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

export const Menue: React.FC<MenueProps> = ({
  content,
  nbr,
  type,
  actual_list_menue: _actual_list_menue,
  setActuallistMenue,
}): React.ReactNode => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (content) return content;

  const menuNames = OnlyOnedMenue?.names ?? [];
  const menuIcons = OnlyOnedMenue?.icones ?? [];
  const menuSections = OnlyOnedMenue?.sections ?? [];

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const onTabClick = (tabIndex: number) => {
    handleClick(tabIndex, setActuallistMenue, type);
    closeSidebar();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle-button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label={isSidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isSidebarOpen}
      >
        <span className="sidebar-toggle-line" />
        <span className="sidebar-toggle-line" />
        <span className="sidebar-toggle-line" />
      </button>

      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'sidebar-overlay-open' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <div className={`sidebar-shell ${isSidebarOpen ? 'sidebar-shell-open' : ''}`}>
        <div className="sidebar-shell-header">
          <button
            type="button"
            className="sidebar-close-button"
            onClick={closeSidebar}
            aria-label="Fermer le menu"
          >
            ×
          </button>
        </div>

        <BarreMenue
          className={ROOTMENUE}
          setTab={(tabIndex: number) => onTabClick(tabIndex)}
          tabs={menuNames}
          icons={menuIcons}
        />

        {Number(nbr) > 1 && (
          <BarreMenue
            className={SECONDARYMENUE}
            setTab={(tabIndex: number) => onTabClick(tabIndex)}
            tabs={menuSections.map((_, i) => menuNames[i] ?? `Section ${i + 1}`)}
            icons={menuSections.map((_, i) => menuIcons[i] ?? null)}
          />
        )}
      </div>
    </>
  );
};

export default Menue;