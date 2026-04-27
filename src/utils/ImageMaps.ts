import identity_picture from "../assets/picture/IMG_20250129_092536_199.jpg";
import terminal from "../assets/picture/description.png";

import cvMcdo from "../assets/picture/cv/cv-mcdo.png";
import cvRechercheTravail20252026 from "../assets/picture/cv/cv-recherche-de-travail-alan-gainie-2025-2026.png";
import cvAlternance2025 from "../assets/picture/cv/CV-alternance-2025-alan-gainie.png";
import cvAlternance2025V2 from "../assets/picture/cv/CV-alternance-2025-alan-gainie(1).png";
import cvAlternance2026 from "../assets/picture/cv/CV-alternance-2026-alan-gainie.png";
import cvRechercheInterim20252026 from "../assets/picture/cv/cv-recherche-de-travail-alan-gainie-2025-2026.png";
import cvStage2026 from "../assets/picture/cv/CV-stage-2026-alan-gainie.png";

import e5Image from "../assets/picture/E5.png";
import e6Image from "../assets/picture/E6.png";

const fallbackImage = "https://placehold.co/1200x700?text=Chargement...";

const imageMap: Record<string, string> = {
  placeholder: fallbackImage,
  identity_picture,
  terminal,
  cv_mcdo: cvMcdo,
  cv_recherche_travail_2025_2026: cvRechercheTravail20252026,
  cv_alternance_2025: cvAlternance2025,
  cv_alternance_2025_v2: cvAlternance2025V2,
  cv_alternance_2026: cvAlternance2026,
  cv_recherche_interim_2025_2026: cvRechercheInterim20252026,
  cv_stage_2026: cvStage2026,
  e5: e5Image,
  e6: e6Image,
};

export function getImageByKey(key?: string): string {
  if (!key) return fallbackImage;
  return imageMap[key] ?? fallbackImage;
}