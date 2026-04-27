import { useMemo } from "react";

import Carrousel from "../composants/ui/Carrousel";
import SectionTitle from "../sections/shared/TitleSection";

import type { CvItem, PageData } from "../../types/pageTypes";

import { getImageByKey } from "../../utils/ImageMaps";
import { isValidLink, resolveLink } from "../../utils/links";

type CvCarouselSectionProps = {
  cvSection: NonNullable<PageData["cvSection"]>;
  cvs: CvItem[];
};

function CvCarouselSection({ cvSection, cvs }: CvCarouselSectionProps) {
  const normalizedCvs = useMemo(() => {
    return cvs.map((cv) => ({
      ...cv,
      downloads: (cv.downloads ?? []).map((download) => ({
        ...download,
        href: resolveLink(download.href),
        isAvailable: isValidLink(download.href),
      })),
    }));
  }, [cvs]);

  const cvSlides = useMemo(() => {
    return normalizedCvs.map((cv) => (
      <div key={cv.title} className="home-cv-slide">
        <img
          src={getImageByKey(cv.imageKey)}
          alt={cv.alt || cv.title}
          className="home-cv-slide-image"
        />
      </div>
    ));
  }, [normalizedCvs]);

  return (
    <section id="cv-carousel" className="home-panel">
      <SectionTitle
        eyebrow={cvSection.eyebrow}
        title={cvSection.title}
        subtitle={cvSection.subtitle}
      />

      <div className="w-full">
        <Carrousel
          slides={cvSlides}
          captions={normalizedCvs.map((cv) => cv.title)}
          autoScroll={false}
          interval={5000}
          showMenu={true}
          menuItems={normalizedCvs.map((cv) => ({
            title: cv.title,
            description: cv.description,
            downloads: cv.downloads,
          }))}
        />
      </div>
    </section>
  );
}

export default CvCarouselSection;