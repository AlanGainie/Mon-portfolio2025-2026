import React, { useEffect } from "react";

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

  // ✅ AJOUT IMPORTANT : calcul automatique de la hauteur du menu
  useEffect(() => {
    const updateHeight = () => {
      const menu = document.querySelector(".menu-container");
      if (menu) {
        document.body.style.setProperty(
          "--menu-height",
          `${menu.getBoundingClientRect().height}px`
        );
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="menu-container">
      {sections.map((item, index) => (
        <div key={item.id} className="menu-item">
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