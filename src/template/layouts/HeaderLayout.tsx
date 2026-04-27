import { useAuth } from "../../auth/AuthContext";

import type { PageData } from "../../types/pageTypes";

import DemoBannerSection from "../sections/DemoBannerSection";
import HeroSection from "../sections/HeroSection";

type HeaderLayoutProps = {
  data: PageData;
};

function HeaderLayout({ data }: HeaderLayoutProps) {
  const { user } = useAuth();
  const isDemo = user?.role === "demo";

  return (
    <div>
      {isDemo && <DemoBannerSection />}

      <HeroSection hero={data.hero} />
    </div>
  );
}

export default HeaderLayout;