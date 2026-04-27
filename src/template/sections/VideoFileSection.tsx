import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";

import type { PageData } from "../../types/pageTypes";

import { getImageByKey } from "../../utils/ImageMaps";
import { isValidLink, resolveLink } from "../../utils/links";

type VideoIntroSectionProps = {
  videoIntro: NonNullable<PageData["videoIntro"]>;
};

function VideoIntroSection({ videoIntro }: VideoIntroSectionProps) {
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const resolvedVideoUrl = useMemo(() => {
    return resolveLink(videoIntro?.videoUrl);
  }, [videoIntro?.videoUrl]);

  const isVideoAvailable = useMemo(() => {
    return isValidLink(videoIntro?.videoUrl);
  }, [videoIntro?.videoUrl]);

  return (
    <section id="video-intro" className="home-panel home-video-grid">
      <div className="home-media-box">
        <div className="home-video-wrapper">
          <img
            src={getImageByKey(videoIntro.thumbnailKey)}
            alt="Miniature vidéo de présentation"
            className="home-video-image"
          />

          <a
            href={resolvedVideoUrl}
            className={`home-video-overlay ${
              isVideoAvailable ? "home-link-active" : "home-link-disabled"
            }`}
            target={isVideoAvailable ? "_blank" : undefined}
            rel={isVideoAvailable ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!isVideoAvailable) {
                e.preventDefault();
              }
            }}
          >
            <span
              className={`home-video-button ${
                isVideoAvailable ? "home-button-red" : ""
              }`}
            >
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
              <h2 className="home-side-title">{videoIntro.sectionTitle}</h2>
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
              {(videoIntro.paragraphs ?? []).map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className={`home-paragraph ${index > 0 ? "mt-4" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="home-info-box">
          <p className="home-info-title">{videoIntro.todoTitle}</p>
          <p className="home-info-text">{videoIntro.todoText}</p>
        </div>
      </div>
    </section>
  );
}

export default VideoIntroSection;