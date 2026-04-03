import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Theme from "../../../src/template/organismes/Themes";
import { THEMES } from "../../styles/tw.ts";

vi.mock("../../../template/composants/effects/Pastel.tsx", () => ({
  default: ({ color }: { color: string }) => (
    <g data-testid="pastel" data-color={color} />
  ),
}));

describe("Theme", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le nombre nbr dans le svg", () => {
    render(<Theme nbr={3} colors={["red", "blue"]} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("rend un composant Pastel pour chaque couleur", () => {
    render(<Theme nbr={2} colors={["red", "blue", "green"]} />);

    const pastels = screen.getAllByTestId("pastel");
    expect(pastels).toHaveLength(3);
  });

  it("transmet correctement chaque couleur à Pastel", () => {
    render(<Theme nbr={1} colors={["red", "blue", "green"]} />);

    const pastels = screen.getAllByTestId("pastel");

    expect(pastels[0]).toHaveAttribute("data-color", "red");
    expect(pastels[1]).toHaveAttribute("data-color", "blue");
    expect(pastels[2]).toHaveAttribute("data-color", "green");
  });

  it("fonctionne sans colors", () => {
    render(<Theme nbr={7} />);

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.queryByTestId("pastel")).not.toBeInTheDocument();
  });

  it("applique la classe THEMES sur le conteneur principal", () => {
    const { container } = render(<Theme nbr={5} colors={["pink"]} />);

    expect(container.firstChild).toHaveClass(THEMES);
  });

  it("contient un svg avec l'id themeSelector", () => {
    render(<Theme nbr={4} colors={["yellow"]} />);

    const svg = document.getElementById("themeSelector");
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName.toLowerCase()).toBe("svg");
  });
});