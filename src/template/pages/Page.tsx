import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

import "../../styles/index.css";
import "../../styles/tw.ts";

import ErrorState from "../sections/errorGest.tsx";

import HeaderLayout from "../layouts/HeaderLayout";
import BodyLayout from "../layouts/BodyLayout";
// import FooterLayout from "../layouts/FooterLayout";

import { PAGESCROLLDOWN, FOOTER, FLEXCOL } from "../../styles/tw.ts";

import type { DisplaysInf, PageData, PageProps } from "../../types/pageTypes";

const pageModules = import.meta.glob("../../../datas/Pages/*.json");

export const HeaderPage = ({
  content,
}: {
  content?: JSX.Element;
}): JSX.Element => {
  if (content) return content;

  return <header />;
};

export const FooterPage = ({
  content,
}: {
  content?: JSX.Element;
}): JSX.Element => {
  if (content) return content;

  return (
    <footer className={FOOTER}>
      <p>© 2025 Alan Gainie - Tous droits réservés</p>
      <nav>
        <a href="/mentions-legales">Mentions légales</a> |{" "}
        <a href="/confidentialite">Confidentialité</a>
      </nav>
    </footer>
  );
};

export const BodyPage = ({
  content,
  enableAnchors = false,
}: {
  content?: JSX.Element;
  tab_menue1?: number;
  tab_menue2?: number;
  displaysInf?: DisplaysInf;
  enableAnchors?: boolean;
}): JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enableAnchors) return;

    const scrollToHash = () => {
      const container = scrollContainerRef.current;
      const hash = window.location.hash;

      if (!container || !hash) return;

      const targetId = decodeURIComponent(hash.replace("#", ""));
      let target: HTMLElement | null = null;

      try {
        target = container.querySelector<HTMLElement>(
          `#${CSS.escape(targetId)}`
        );
      } catch {
        target = container.querySelector<HTMLElement>(`#${targetId}`);
      }

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const timeoutId = window.setTimeout(scrollToHash, 0);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [enableAnchors]);

  return (
    <div ref={scrollContainerRef} className={PAGESCROLLDOWN}>
      {content}
    </div>
  );
};

function PortfolioContent({ data }: { data: PageData }): JSX.Element {
  const { user } = useAuth();
  const isDemo = user?.role === "demo";

  return (
    <div
      className={`${FLEXCOL} home-page-shell ${
        isDemo ? "home-theme-demo" : "home-theme-default"
      }`}
    >
      <HeaderLayout data={data} />
      <BodyLayout data={data} />
      {/* <FooterLayout data={data} /> */}
    </div>
  );
}

function Page({
  pageDataFile = "PageUser.json",
  content,
}: PageProps): JSX.Element {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loadingError, setLoadingError] = useState("");

  const modulePath = useMemo(
    () => `../../../datas/Pages/${pageDataFile}`,
    [pageDataFile]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadPageData() {
      setLoadingError("");
      setPageData(null);

      const importer = pageModules[modulePath];

      if (!importer) {
        setLoadingError(`Fichier introuvable : ${pageDataFile}`);
        return;
      }

      try {
        const mod = (await importer()) as { default: PageData };

        if (!cancelled) {
          setPageData(mod.default);
        }
      } catch (error) {
        console.error("Erreur chargement page JSON :", error);

        if (!cancelled) {
          setLoadingError(`Impossible de charger : ${pageDataFile}`);
        }
      }
    }

    loadPageData();

    return () => {
      cancelled = true;
    };
  }, [modulePath, pageDataFile]);

  if (content) return content;

  if (loadingError) {
    return <ErrorState type="not_found" target="page" />;
  }

  if (!pageData) {
    return (
      <section className="home-panel">
        <p className="home-paragraph">Chargement de la page...</p>
      </section>
    );
  }

  return <PortfolioContent data={pageData} />;
}

export default Page;