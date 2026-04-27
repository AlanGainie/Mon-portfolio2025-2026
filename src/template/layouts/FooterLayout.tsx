import { FOOTER } from "../../styles/tw.ts";

import type { PageData } from "../../types/pageTypes";

type FooterLayoutProps = {
  data: PageData;
};

function FooterLayout({ data }: FooterLayoutProps) {
  return (
    <footer className={FOOTER}>
      <p>© 2025 Alan Gainie - Tous droits réservés</p>
      <nav>
        <a href="/mentions-legales">Mentions légales</a> |{" "}
        <a href="/confidentialite">Confidentialité</a>
      </nav>
    </footer>
  );
}

export default FooterLayout;