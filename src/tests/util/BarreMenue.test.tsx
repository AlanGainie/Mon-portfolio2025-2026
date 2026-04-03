import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BarreMenue from "../../../src/template/organismes/BarreMenue";

// Mock du composant Button pour tester BarreMenue isolément
vi.mock("../../../template/composants/Button", () => ({
  default: ({
    name,
    icon,
    onClick,
    uncolor,
  }: {
    name: string;
    icon?: string;
    onClick: () => void;
    uncolor?: boolean;
  }) => (
    <button
      type="button"
      data-testid={`button-${name}`}
      data-icon={icon ?? ""}
      data-uncolor={String(uncolor)}
      onClick={onClick}
    >
      {name}
    </button>
  ),
}));

describe("BarreMenue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche un bouton pour chaque onglet", () => {
    render(
      <BarreMenue
        tabs={["Accueil", "Projets", "Contact"]}
        setTab={vi.fn()}
      />
    );

    expect(screen.getByTestId("button-Accueil")).toBeInTheDocument();
    expect(screen.getByTestId("button-Projets")).toBeInTheDocument();
    expect(screen.getByTestId("button-Contact")).toBeInTheDocument();
  });

  it("appelle setTab avec le bon index au clic", () => {
    const setTab = vi.fn();

    render(
      <BarreMenue
        tabs={["Accueil", "Projets", "Contact"]}
        setTab={setTab}
      />
    );

    fireEvent.click(screen.getByTestId("button-Accueil"));
    fireEvent.click(screen.getByTestId("button-Projets"));
    fireEvent.click(screen.getByTestId("button-Contact"));

    expect(setTab).toHaveBeenNthCalledWith(1, 0);
    expect(setTab).toHaveBeenNthCalledWith(2, 1);
    expect(setTab).toHaveBeenNthCalledWith(3, 2);
  });

  it("transmet correctement les icônes aux boutons", () => {
    render(
      <BarreMenue
        tabs={["Accueil", "Projets", "Contact"]}
        icons={["🏠", "📁", "✉️"]}
        setTab={vi.fn()}
      />
    );

    expect(screen.getByTestId("button-Accueil")).toHaveAttribute(
      "data-icon",
      "🏠"
    );
    expect(screen.getByTestId("button-Projets")).toHaveAttribute(
      "data-icon",
      "📁"
    );
    expect(screen.getByTestId("button-Contact")).toHaveAttribute(
      "data-icon",
      "✉️"
    );
  });

  it("fonctionne même sans icônes", () => {
    render(
      <BarreMenue
        tabs={["Accueil", "Projets"]}
        setTab={vi.fn()}
      />
    );

    expect(screen.getByTestId("button-Accueil")).toHaveAttribute(
      "data-icon",
      ""
    );
    expect(screen.getByTestId("button-Projets")).toHaveAttribute(
      "data-icon",
      ""
    );
  });

  it("passe uncolor=true à chaque bouton", () => {
    render(
      <BarreMenue
        tabs={["Accueil", "Projets"]}
        setTab={vi.fn()}
      />
    );

    expect(screen.getByTestId("button-Accueil")).toHaveAttribute(
      "data-uncolor",
      "true"
    );
    expect(screen.getByTestId("button-Projets")).toHaveAttribute(
      "data-uncolor",
      "true"
    );
  });

  it("applique la className au conteneur", () => {
    const { container } = render(
      <BarreMenue
        className="menu-test"
        tabs={["Accueil", "Projets"]}
        setTab={vi.fn()}
      />
    );

    expect(container.firstChild).toHaveClass("menu-test");
  });

  it("n'affiche aucun bouton si tabs est vide", () => {
    const { container } = render(
      <BarreMenue
        tabs={[]}
        setTab={vi.fn()}
      />
    );

    expect(container.querySelectorAll("button")).toHaveLength(0);
  });
});