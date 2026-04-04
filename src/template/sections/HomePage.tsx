import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { FLEXCOL } from "../../styles/tw";
import Crop from "../composants/effects/Crop";
import ButtonTypewriter from "../composants/effects/Typewriter";
import Carrousel from "../composants/ui/Carrousel";
import ExamResourceCard from "../composants/ui/ExamResourceCard";

import identity_picture from "../../assets/picture/IMG_20250129_092536_199.jpg";
import terminal from "../../assets/picture/description.png";

import cvMcdo from "../../assets/picture/cv/cv-mcdo.png";
import cvRechercheTravail20252026 from "../../assets/picture/cv/cv-recherche-de-travail-alan-gainie-2025-2026.png";
import cvAlternance2025 from "../../assets/picture/cv/CV-alternance-2025-alan-gainie.png";
import cvAlternance2025V2 from "../../assets/picture/cv/CV-alternance-2025-alan-gainie(1).png";
import cvAlternance2026 from "../../assets/picture/cv/CV-alternance-2026-alan-gainie.png";
import cvRechercheInterim20252026 from "../../assets/picture/cv/cv-recherche-de-travail-alan-gainie-2025-2026.png";
import cvStage2026 from "../../assets/picture/cv/CV-stage-2026-alan-gainie.png";

import e5Image from "../../assets/picture/E5.png";
import e6Image from "../../assets/picture/E6.png";

import type { PageData, CvItem, ExamResource, SummaryLink } from "../pages/Page";

const fallbackImage = "https://placehold.co/1200x700?text=Chargement...";
const isMobile = document.body.dataset.screen === "mobile";

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

function getImageByKey(key?: string): string {
  if (!key) return fallbackImage;
  return imageMap[key] ?? fallbackImage;
}

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

function HomePage({ data }: { data: PageData }) {
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const videoIntro = data.videoIntro;
  const summaryLinks = data.summaryLinks ?? [];
  const profile = data.profile;
  const cvSection = data.cvSection;
  const cvs = data.cvs ?? [];
  const examSection = data.examSection;
  const examResources = data.examResources ?? [];

  const cvSlides = useMemo(() => {
    return cvs.map((cv: CvItem) => (
      <div key={cv.title} className="home-cv-slide">
        <img
          src={getImageByKey(cv.imageKey)}
          alt={cv.alt || cv.title}
          className="home-cv-slide-image"
        />
      </div>
    ));
  }, [cvs]);

  const examResourcesWithImages = useMemo(() => {
    return examResources.map((resource: ExamResource) => ({
      ...resource,
      image: getImageByKey(resource.imageKey),
    }));
  }, [examResources]);

  return (
    <div className={`${FLEXCOL} home-page-shell`}>
      <section className="home-panel home-hero-panel">
        <div className="home-hero-content">
          <p className="home-hero-eyebrow">{data.hero?.eyebrow ?? ""}</p>
          <h1 className="home-hero-title">{data.hero?.title ?? ""}</h1>
          <p className="home-hero-text">{data.hero?.text ?? ""}</p>

          <div className="home-typewriter-box">
            <ButtonTypewriter content={data.hero?.typewriterText ?? ""} />
          </div>
        </div>
      </section>

      {videoIntro && (
        <section id="video-intro" className="home-panel home-video-grid">
          <div className="home-media-box">
            <div className="home-video-wrapper">
              <img
                src={getImageByKey(videoIntro.thumbnailKey)}
                alt="Miniature vidéo de présentation"
                className="home-video-image"
              />

              <a
                href={videoIntro.videoUrl || "#"}
                className="home-video-overlay"
                target={
                  videoIntro.videoUrl && videoIntro.videoUrl !== "#"
                    ? "_blank"
                    : undefined
                }
                rel={
                  videoIntro.videoUrl && videoIntro.videoUrl !== "#"
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={(e) => {
                  if (!videoIntro.videoUrl || videoIntro.videoUrl === "#") {
                    e.preventDefault();
                  }
                }}
              >
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
                  <p className="home-section-eyebrow">
                    {videoIntro.sectionEyebrow}
                  </p>
                  <h2 className="home-side-title">
                    {videoIntro.sectionTitle}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsIntroOpen((prev) => !prev)}
                  className="home-action-button"
                >
                  {isIntroOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  {isIntroOpen ? "Replier" : "Déplier"}
                </button>
              </div>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isIntroOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-80"
                }`}
              >
                <div className="overflow-hidden">
                  {(videoIntro.paragraphs ?? []).map(
                    (paragraph: string, index: number) => (
                      <p
                        key={`${paragraph}-${index}`}
                        className={`home-paragraph ${index > 0 ? "mt-4" : ""}`}
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="home-info-box">
              <p className="home-info-title">{videoIntro.todoTitle}</p>
              <p className="home-info-text">{videoIntro.todoText}</p>
            </div>
          </div>
        </section>
      )}

      {!!summaryLinks.length && (
        <section id="sommaire" className="home-panel">
          <SectionTitle
            eyebrow="Navigation"
            title="Sommaire du projet"
            subtitle="Chaque section possède une ancre pour être facilement accessible depuis le menu du portfolio."
          />

          <div className="home-summary-grid">
            {summaryLinks.map((item: SummaryLink, index: number) => (
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
      )}

      {profile && (
        <section id="presentation-candidat" className="home-panel">
          <SectionTitle
            eyebrow={profile.eyebrow}
            title={profile.title}
            subtitle={profile.subtitle}
          />

          <div className="home-profile-grid">
            <div className="home-photo-card">
              <Crop
                path={getImageByKey(profile.identityPictureKey)}
                height={isMobile ? 425 : 550}
                width={isMobile ? 425 : 550}
                className="identite"
                errorloadtext="photo d'identité"
                legende={profile.identityLegend}
              />
            </div>

            <div className="home-profile-content">
              <div className="home-subcard">
                <h3 className="home-subcard-title">{profile.whoAmITitle}</h3>
                <p className="home-paragraph">{profile.whoAmIText}</p>
              </div>

              <img
                src={getImageByKey(profile.terminalImageKey)}
                alt="Terminal de présentation du candidat"
              />

              <div className="home-mini-grid">
                <div className="home-subcard">
                  <h4 className="home-mini-title">{profile.skillsTitle}</h4>
                  <p className="home-mini-text">{profile.skillsText}</p>
                </div>

                <div className="home-subcard">
                  <h4 className="home-mini-title">{profile.goalsTitle}</h4>
                  <p className="home-mini-text">{profile.goalsText}</p>
                </div>
              </div>

              <div className="home-highlight-card">
                <h4 className="home-highlight-title">{profile.hookTitle}</h4>
                <p className="home-highlight-text">{profile.hookText}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {!!cvs.length && cvSection && (
        <section id="cv-carousel" className="home-panel">
          <SectionTitle
            eyebrow={cvSection.eyebrow}
            title={cvSection.title}
            subtitle={cvSection.subtitle}
          />

          <div className="w-full">
            <Carrousel
              slides={cvSlides}
              captions={cvs.map((cv: CvItem) => cv.title)}
              autoScroll={false}
              interval={5000}
              showMenu={true}
              menuItems={cvs.map((cv: CvItem) => ({
                title: cv.title,
                description: cv.description,
                downloads: cv.downloads,
              }))}
            />
          </div>
        </section>
      )}

      {!!examResourcesWithImages.length && examSection && (
        <section id="epreuves-e5-e6" className="home-panel">
          <SectionTitle
            eyebrow={examSection.eyebrow}
            title={examSection.title}
            subtitle={examSection.subtitle}
          />

          <div className="home-evaluation-grid">
            {examResourcesWithImages.map(
              (resource: ExamResource & { image: string }) => (
                <ExamResourceCard key={resource.title} resource={resource} />
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;