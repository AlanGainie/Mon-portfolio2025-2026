import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ButtonTypewriter, {
  ButtonLinkwriter,
} from "../../../src/template/composants/effects/Typewriter";

// Mock du composant Button
vi.mock("../../../template/composants/ui/Button", () => ({
  default: ({
    name,
    onClick,
  }: {
    name: string;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {name}
    </button>
  ),
}));

describe("Typewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("n'affiche rien au départ tant que le bouton n'a pas été cliqué", () => {
    render(<ButtonTypewriter />);

    expect(
      screen.getByRole("button", { name: "Démarrer la machine à écrire" })
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Je teste avec un contenu court et simple")
    ).not.toBeInTheDocument();
  });

  it("démarre l'effet d'écriture après clic", () => {
    render(<ButtonTypewriter />);

    fireEvent.click(
      screen.getByRole("button", { name: "Démarrer la machine à écrire" })
    );

    act(() => {
      vi.advanceTimersByTime(20);
    });

    const containerText = screen.getByText((content) =>
      content.includes("J")
    );
    expect(containerText).toBeInTheDocument();
  });

  it("affiche progressivement le texte complet puis le curseur final", () => {
    render(<ButtonTypewriter />);

    fireEvent.click(
      screen.getByRole("button", { name: "Démarrer la machine à écrire" })
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByText("Je teste avec un contenu court et simple")
    ).toBeInTheDocument();

    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("relance l'animation quand on reclique sur le bouton principal", () => {
    render(<ButtonTypewriter />);

    const startButton = screen.getByRole("button", {
      name: "Démarrer la machine à écrire",
    });

    fireEvent.click(startButton);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByText("Je teste avec un contenu court et simple")
    ).toBeInTheDocument();

    fireEvent.click(startButton);

    act(() => {
      vi.advanceTimersByTime(20);
    });

    const contentStillVisible = screen.getByText((content) =>
      content.length > 0
    );
    expect(contentStillVisible).toBeInTheDocument();
  });
});

describe("ButtonLinkwriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("affiche le bouton d'ajout", () => {
    render(<ButtonLinkwriter text=" Bonjour" />);

    expect(
      screen.getByRole("button", { name: "Ajouter du texte" })
    ).toBeInTheDocument();
  });

  it("ajoute du texte au clic", () => {
    render(<ButtonLinkwriter text=" Bonjour" />);

    fireEvent.click(
      screen.getByRole("button", { name: "Ajouter du texte" })
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Bonjour", { exact: false })).toBeInTheDocument();
  });

  it("cumule le texte si on clique plusieurs fois", () => {
    render(<ButtonLinkwriter text=" X" />);

    const button = screen.getByRole("button", { name: "Ajouter du texte" });

    fireEvent.click(button);
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText((content) => content.includes("X X"))).toBeInTheDocument();
  });

  it("utilise le texte par défaut si aucune prop text n'est fournie", () => {
    render(<ButtonLinkwriter />);

    fireEvent.click(
      screen.getByRole("button", { name: "Ajouter du texte" })
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByText((content) => content.includes("Nouveau texte ajouté."))
    ).toBeInTheDocument();
  });
});