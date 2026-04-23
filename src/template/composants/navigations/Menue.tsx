import React, { useState, useEffect } from "react";

const handleClick = (
  tabIndex: number,
  setActuallistMenue: React.Dispatch<React.SetStateAction<number>>,
  HOME_ANCHOR_IDS: readonly string[]
) => {
  setActuallistMenue(tabIndex);

  const targetAnchor = HOME_ANCHOR_IDS[tabIndex];
  if (!targetAnchor) return;

  const el = document.getElementById(targetAnchor);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

interface MenueProps {
  sections: {
    id: string;
    label: string;
    style: string;
  }[];
  HOME_ANCHOR_IDS: readonly string[];
  actual_list_menue: number;
  setActuallistMenue: React.Dispatch<React.SetStateAction<number>>;
}

export const Menue: React.FC<MenueProps> = ({
  sections,
  HOME_ANCHOR_IDS,
  actual_list_menue,
  setActuallistMenue,
}) => {
  const onTabClick = (index: number) => {
    handleClick(index, setActuallistMenue, HOME_ANCHOR_IDS);
  };

  return (
    <div
      className="menu-container"
      style={{
        position: 'sticky', // Utilisation de sticky pour suivre la barre de prévisualisation
        top: '30px', // Placer le menu 30px sous la `admin-preview-wrapper`
        zIndex: 1300, // Placer le menu au-dessus des autres éléments
        width: '100%',
        backgroundColor: 'var(--bg)',  // Couleur d'arrière-plan pour le menu
        padding: '10px 20px',  // Espacement interne
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Ombre pour le menu
      }}
    >
      {sections.map((item, index) => (
        <div key={item.id} className={`menu-item ${item.style}`}>
          <button
            onClick={() => onTabClick(index)}
            className={index === actual_list_menue ? "active" : ""}
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menue;