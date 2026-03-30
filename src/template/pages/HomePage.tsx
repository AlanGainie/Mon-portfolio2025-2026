import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Presentation, PlayCircle } from 'lucide-react';
import { FLEXCOL } from '../../styles/tw';
import identity_picture from '../../assets/picture/IMG_20250129_092536_199.jpg';
import terminal from '../../assets/picture/description.png';
import Crop from '../composants/Crop';
import ButtonTypewriter from '../composants/Typewriter';
import Carrousel from '../composants/Carrousel';

import cvMcdo from '../../assets/picture/cv/cv-mcdo.png';
import cvRechercheTravail20252026 from '../../assets/picture/cv/cv-recherche-de-travail-alan-gainie-2025-2026.png';
import cvAlternance2025 from '../../assets/picture/cv/CV-alternance-2025-alan-gainie.png';
import cvAlternance2025V2 from '../../assets/picture/cv/CV-alternance-2025-alan-gainie(1).png';
import cvAlternance2026 from '../../assets/picture/cv/CV-alternance-2026-alan-gainie.png';
import cvRechercheInterim20252026 from '../../assets/picture/cv/cv-recherche-de-travail-alan-gainie-2025-2026.png';
import cvStage2026 from '../../assets/picture/cv/CV-stage-2026-alan-gainie.png';

const placeholderImage = 'https://placehold.co/1200x700?text=Chargement...';
const placeholderPdf = '#';
const placeholderSlides = '#';
const placeholderVideo = '#';

const summaryLinks = [
  { id: 'video-intro', label: 'Vidéo explicative' },
  { id: 'sommaire', label: 'Sommaire' },
  { id: 'presentation-candidat', label: 'Présentation du candidat' },
  { id: 'cv-carousel', label: 'CV' },
  { id: 'epreuves-e5-e6', label: 'Présentation E5 / E6' },
];

const cvs = [
  {
    title: 'CV général 2026-2027',
    image: placeholderImage,
    alt: 'Aperçu du CV général 2026-2027',
    description: 'Version générale de mon CV pour les candidatures 2026-2027.',
    downloads: [{ label: 'Télécharger le PDF', href: '#', download: true }],
  },
  {
    title: 'CV McDo',
    image: cvMcdo,
    alt: 'Aperçu du CV McDo',
    description: 'Version adaptée à une candidature dans la restauration rapide.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvMcdo },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
  {
    title: 'CV recherche de travail 2025-2026',
    image: cvRechercheTravail20252026,
    alt: 'Aperçu du CV recherche de travail 2025-2026',
    description: 'Version orientée recherche d’emploi pour 2025-2026.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvRechercheTravail20252026 },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
  {
    title: 'CV alternance 2025',
    image: cvAlternance2025,
    alt: 'Aperçu du CV alternance 2025',
    description: 'Version orientée alternance pour 2025.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvAlternance2025 },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
  {
    title: 'CV alternance 2025 - version 2',
    image: cvAlternance2025V2,
    alt: 'Aperçu du CV alternance 2025 version 2',
    description: 'Seconde version du CV alternance 2025.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvAlternance2025V2 },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
  {
    title: 'CV alternance 2026',
    image: cvAlternance2026,
    alt: 'Aperçu du CV alternance 2026',
    description: 'Version orientée alternance pour 2026.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvAlternance2026 },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
  {
    title: 'CV recherche intérim 2025-2026',
    image: cvRechercheInterim20252026,
    alt: 'Aperçu du CV recherche intérim 2025-2026',
    description: 'Version destinée à la recherche de missions d’intérim.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvRechercheInterim20252026 },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
  {
    title: 'CV stage 2026',
    image: cvStage2026,
    alt: 'Aperçu du CV stage 2026',
    description: 'Version orientée recherche de stage pour 2026.',
    downloads: [
      { label: 'Télécharger le PNG', href: cvStage2026 },
      { label: 'Télécharger le PDF', href: '#', download: true },
    ],
  },
];

const evaluations = [
  {
    title: 'Épreuve E5',
    description:
      'Présentation de l’épreuve E5, des compétences mobilisées, des productions réalisées et des documents associés.',
    pdf: placeholderPdf,
    slides: placeholderSlides,
  },
  {
    title: 'Épreuve E6',
    description:
      'Présentation de l’épreuve E6, du projet support, des objectifs techniques et des livrables de soutenance.',
    pdf: placeholderPdf,
    slides: placeholderSlides,
  },
];

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="home-section-title">
      <p className="home-section-eyebrow">{eyebrow}</p>
      <h2 className="home-section-heading">{title}</h2>
      {subtitle ? <p className="home-section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

function HomePage() {
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const cvSlides = cvs.map((cv) => (
    <div key={cv.title} className="home-cv-slide">
      <img
        src={cv.image || placeholderImage}
        alt={cv.alt}
        className="home-cv-slide-image"
      />
    </div>
  ));

  return (
    <div className={`${FLEXCOL} home-page-shell`}>
      <section className="home-panel home-hero-panel">
        <div className="home-hero-content">
          <p className="home-hero-eyebrow">Portfolio</p>
          <h1 className="home-hero-title">Bienvenue sur mon portfolio informatique</h1>
          <p className="home-hero-text">
            Cette page d’accueil centralise ma présentation, mes différents CV ainsi
            que les accès rapides vers les documents liés à mes épreuves professionnelles.
          </p>

          <div className="home-typewriter-box">
            <ButtonTypewriter content="Bienvenue sur mon portfolio informatique" />
          </div>
        </div>
      </section>

      <section id="video-intro" className="home-panel home-video-grid">
        <div className="home-media-box">
          <div className="home-video-wrapper">
            <img
              src={placeholderImage}
              alt="Miniature vidéo de présentation en chargement"
              className="home-video-image"
            />
            <a href={placeholderVideo} className="home-video-overlay">
              <span className="home-video-button">
                <PlayCircle className="h-5 w-5" />
                Lancer la vidéo
              </span>
            </a>
          </div>
        </div>

        <div className="home-side-card">
          <div>
            <div className="home-side-card-header">
              <div>
                <p className="home-section-eyebrow">Introduction</p>
                <h2 className="home-side-title">Accueil du portfolio</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsIntroOpen((prev) => !prev)}
                className="home-action-button"
              >
                {isIntroOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {isIntroOpen ? 'Replier' : 'Déplier'}
              </button>
            </div>

            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                isIntroOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-80'
              }`}
            >
              <div className="overflow-hidden">
                <p className="home-paragraph">
                  Cette page d’accueil présente rapidement le projet, son objectif et son contenu.
                  La vidéo explicative sera remplacée plus tard par la tienne. En attendant,
                  un visuel de chargement est utilisé comme remplacement.
                </p>
                <p className="home-paragraph mt-4">
                  Le résumé est repliable pour garder une interface propre et permettre à
                  l’utilisateur de se concentrer sur les sections importantes du portfolio.
                </p>
              </div>
            </div>
          </div>

          <div className="home-info-box">
            <p className="home-info-title">À prévoir</p>
            <p className="home-info-text">
              Vidéo finale, miniature personnalisée, texte d’introduction définitif
              et éventuellement sous-titres.
            </p>
          </div>
        </div>
      </section>

      <section id="sommaire" className="home-panel">
        <SectionTitle
          eyebrow="Navigation"
          title="Sommaire du projet"
          subtitle="Chaque section possède une ancre pour être facilement accessible depuis le menu du portfolio."
        />

        <div className="home-summary-grid">
          {summaryLinks.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className="home-summary-card">
              <p className="home-summary-index">Section {index + 1}</p>
              <h3 className="home-summary-title">{item.label}</h3>
              <p className="home-summary-text">
                Accéder directement à cette partie du portfolio.
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="presentation-candidat" className="home-panel">
        <SectionTitle
          eyebrow="Profil"
          title="Présentation détaillée du candidat"
          subtitle="Une section plus complète pour présenter ton parcours, ton profil et ton projet professionnel."
        />

        <div className="home-profile-grid">
          <div className="home-photo-card">
            <Crop
              path={identity_picture}
              height={500}
              width={500}
              errorloadtext="photo d'identité"
              legende="Photo d'identité mai 2025"
            />
          </div>

          <div className="home-profile-content">
            <div className="home-subcard">
              <h3 className="home-subcard-title">Qui suis-je ?</h3>
              <p className="home-paragraph">
                Étudiant en BTS SIO 2ᵉ année (SLAM) à Rennes, je suis créatif et je me suis fixé comme objectif d’en apprendre toujours plus, jour après jour. Passionné par le développement informatique, je suis curieux et motivé. Je souhaite approfondir mes compétences en développement web et data, et contribuer activement à des projets concrets.
              </p>
            </div>

            <img src={terminal} alt="Terminal de présentation du candidat" />

            <div className="home-mini-grid">
              <div className="home-subcard">
                <h4 className="home-mini-title">Compétences</h4>
                <p className="home-mini-text">
                  Développement web, programmation, gestion de projet, outils collaboratifs,
                  bases de données et conception.
                </p>
              </div>

              <div className="home-subcard">
                <h4 className="home-mini-title">Objectifs</h4>
                <p className="home-mini-text">
                  Je cherche à développer mes compétences afin de devenir développeur et d’étoffer mon apprentissage en milieu professionnel.
                </p>
              </div>
            </div>

            <div className="home-highlight-card">
              <h4 className="home-highlight-title">Phrase d’accroche</h4>
              <p className="home-highlight-text">
                « De futur développeur à magicien du clavier »
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cv-carousel" className="home-panel">
        <SectionTitle
          eyebrow="Documents"
          title="Mes CV"
          subtitle="Cette section regroupe les différentes versions de mon CV avec aperçu, description et téléchargements."
        />

        <div className="w-full">
          <Carrousel
            slides={cvSlides}
            captions={cvs.map((cv) => cv.title)}
            autoScroll={false}
            interval={5000}
            showMenu={true}
            menuItems={cvs.map((cv) => ({
              title: cv.title,
              description: cv.description,
              downloads: cv.downloads,
            }))}
          />
        </div>
      </section>

      <section id="epreuves-e5-e6" className="home-panel">
        <SectionTitle
          eyebrow="Épreuves"
          title="Présentation E5 et E6"
          subtitle="Deux espaces dédiés à tes épreuves avec téléchargement du PDF et accès au diaporama."
        />

        <div className="home-evaluation-grid">
          {evaluations.map((evaluation) => (
            <article key={evaluation.title} className="home-evaluation-card">
              <div className="home-evaluation-image-box">
                <img
                  src={placeholderImage}
                  alt={`Illustration de ${evaluation.title} en chargement`}
                  className="home-evaluation-image"
                />
              </div>

              <div className="home-evaluation-content">
                <h3 className="home-evaluation-title">{evaluation.title}</h3>
                <p className="home-paragraph home-evaluation-text">{evaluation.description}</p>

                <div className="home-evaluation-actions">
                  <a href={evaluation.pdf} className="home-action-link home-action-link-secondary">
                    <FileText className="h-4 w-4" />
                    Télécharger le PDF
                  </a>

                  <a href={evaluation.slides} className="home-action-link home-action-link-primary">
                    <Presentation className="h-4 w-4" />
                    Voir le diaporama
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;