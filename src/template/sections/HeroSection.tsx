import ButtonTypewriter from "../composants/effects/Typewriter";

import type { PageData } from "../../types/pageTypes";

type HeroSectionProps = {
  hero: PageData["hero"];
};

function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="home-panel home-hero-panel">
      <div className="home-hero-content">
        <p className="home-hero-eyebrow">{hero?.eyebrow ?? ""}</p>
        <h1 className="home-hero-title">{hero?.title ?? ""}</h1>
        <p className="home-hero-text">{hero?.text ?? ""}</p>

        <div className="home-typewriter-box">
          <ButtonTypewriter content={hero?.typewriterText ?? ""} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;