import Crop from "../composants/effects/Crop";

import type { PageData } from "../../types/pageTypes";

import { getImageByKey } from "../../utils/ImageMaps";
import TitleSection from "./shared/TitleSection";

const isMobile = document.body.dataset.screen === "mobile";

type ProfileSectionProps = {
  profile: NonNullable<PageData["profile"]>;
};

function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <section id="presentation-candidat" className="home-panel">
      <TitleSection
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
  );
}

export default ProfileSection;