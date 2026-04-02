import { JSX } from "react";
import type { AdministrativeContent } from "../composants/Page";

type HomePageProps = {
  showAdministrativeSection?: boolean;
  administrativeContent?: AdministrativeContent;
};

export default function HomePage({
  showAdministrativeSection = false,
  administrativeContent,
}: HomePageProps): JSX.Element {
  return (
    <div>
      <h1>Accueil</h1>

      {showAdministrativeSection && administrativeContent?.description && (
        <section>
          <h2>Section administrative</h2>
          <p>{administrativeContent.description}</p>
        </section>
      )}
    </div>
  );
}