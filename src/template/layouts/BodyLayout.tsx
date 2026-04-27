import { useAuth } from "../../auth/AuthContext";
import { FLEXCOL } from "../../styles/tw.ts";

import type { PageData } from "../../types/pageTypes";

import VideoIntroSection from "../sections/VideoFileSection.tsx";
import SummarySection from "../sections/SummarySection.tsx";
import ProfileSection from "../sections/ProfileSection.tsx";
import CvCarouselSection from "../sections/CvCarouselSection.tsx";
import ExamResourcesSection from "../sections/ExamResourcesSection.tsx";

type BodyLayoutProps = {
  data: PageData;
};

function BodyLayout({ data }: BodyLayoutProps) {
  const { user } = useAuth();
  const isDemo = user?.role === "demo";

  const videoIntro = data.videoIntro;
  const summaryLinks = data.summaryLinks ?? [];
  const profile = data.profile;
  const cvSection = data.cvSection;
  const cvs = data.cvs ?? [];
  const examSection = data.examSection;
  const examResources = data.examResources ?? [];

  return (
    <div
      className={`${FLEXCOL} home-page-shell ${
        isDemo ? "home-theme-demo" : "home-theme-default"
      }`}
    >
      {videoIntro && <VideoIntroSection videoIntro={videoIntro} />}

      {!!summaryLinks.length && <SummarySection summaryLinks={summaryLinks} />}

      {profile && <ProfileSection profile={profile} />}

      {!!cvs.length && cvSection && (
        <CvCarouselSection cvSection={cvSection} cvs={cvs} />
      )}

      {!!examResources.length && examSection && (
        <ExamResourcesSection
          examSection={examSection}
          examResources={examResources}
        />
      )}
    </div>
  );
}

export default BodyLayout;