import { useMemo } from "react";

import ExamResourceCard from "../composants/ui/ExamResourceCard";
import SectionTitle from "../sections/shared/TitleSection";

import type { ExamResource, PageData } from "../../types/pageTypes";

import { getImageByKey } from "../../utils/ImageMaps";
import { isValidLink, resolveLink } from "../../utils/links";

type ExamResourcesSectionProps = {
  examSection: NonNullable<PageData["examSection"]>;
  examResources: ExamResource[];
};

function ExamResourcesSection({
  examSection,
  examResources,
}: ExamResourcesSectionProps) {
  const examResourcesWithImages = useMemo(() => {
    return examResources.map((resource) => ({
      ...resource,
      pdf: resolveLink(resource.pdf),
      slides: resolveLink(resource.slides),
      folder: resolveLink(resource.folder),
      image: getImageByKey(resource.imageKey),
      isPdfAvailable: isValidLink(resource.pdf),
      isSlidesAvailable: isValidLink(resource.slides),
      isFolderAvailable: isValidLink(resource.folder),
    }));
  }, [examResources]);

  return (
    <section id="epreuves-e5-e6" className="home-panel">
      <SectionTitle
        eyebrow={examSection.eyebrow}
        title={examSection.title}
        subtitle={examSection.subtitle}
      />

      <div className="home-evaluation-grid">
        {examResourcesWithImages.map((resource) => (
          <ExamResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default ExamResourcesSection;