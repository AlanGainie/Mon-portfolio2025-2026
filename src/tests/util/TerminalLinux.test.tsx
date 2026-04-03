import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import TerminalLinux from "../../../src/template/organismes/TerminalLinux";

type ReactTerminalProps = {
  commands: Record<string, (...args: any[]) => any>;
  welcomeMessage: string;
  prompt: string;
  theme: Record<string, string>;
  showControlBar: boolean;
  allowTabs: boolean;
};

let latestTerminalProps: ReactTerminalProps | null = null;

vi.mock("react-terminal", () => ({
  ReactTerminal: (props: ReactTerminalProps) => {
    latestTerminalProps = props;

    return (
      <div data-testid="mock-terminal">
        <div data-testid="welcome-message">{props.welcomeMessage}</div>
        <div data-testid="prompt">{props.prompt}</div>
      </div>
    );
  },
}));

describe("TerminalLinux", () => {
  beforeEach(() => {
    latestTerminalProps = null;
    vi.restoreAllMocks();
  });

  it("affiche le terminal avec le message d'accueil et le prompt initial", () => {
    render(<TerminalLinux />);

    expect(screen.getByTestId("mock-terminal")).toBeInTheDocument();
    expect(screen.getByTestId("welcome-message").textContent).toContain(
      "Bienvenue sur mon terminal Fedora"
    );
    expect(screen.getByTestId("prompt").textContent).toBe(
      "alan@portfolio:/home$"
    );
  });

  it("configure ReactTerminal avec les bonnes options", () => {
    render(<TerminalLinux />);

    expect(latestTerminalProps).not.toBeNull();
    expect(latestTerminalProps?.showControlBar).toBe(false);
    expect(latestTerminalProps?.allowTabs).toBe(false);
    expect(latestTerminalProps?.theme.background).toBe("#000000");
  });

  it("retourne les commandes disponibles avec help", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.help();
    expect(result).toContain("help");
    expect(result).toContain("ls");
    expect(result).toContain("cd");
    expect(result).toContain("clear");
  });

  it("retourne le chemin courant avec pwd", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.pwd();
    expect(result).toBe("/home");
  });

  it("liste le contenu du dossier courant avec ls", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.ls([]);
    expect(result).toContain("readme.txt");
  });

  it("lit le contenu d'un fichier avec cat", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.cat(["readme.txt"]);
    expect(result).toBe("Bienvenue dans mon terminal personnalisé !");
  });

  it("renvoie une erreur si cat est appelé sans argument", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.cat([]);
    expect(result).toBe("cat: Fichier non spécifié");
  });

  it("change de dossier avec cd et met à jour le prompt", async () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.cd(["/var"]);
    expect(result).toBe("");

    await waitFor(() => {
      expect(screen.getByTestId("prompt").textContent).toBe(
        "alan@portfolio:/var$"
      );
    });
  });

  it("revient à /home si cd est appelé sans argument", async () => {
    render(<TerminalLinux />);

    latestTerminalProps?.commands.cd(["/var"]);

    await waitFor(() => {
      expect(screen.getByTestId("prompt").textContent).toBe(
        "alan@portfolio:/var$"
      );
    });

    latestTerminalProps?.commands.cd([]);

    await waitFor(() => {
      expect(screen.getByTestId("prompt").textContent).toBe(
        "alan@portfolio:/home$"
      );
    });
  });

  it("renvoie une erreur si cd cible un dossier inexistant", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.cd(["/inconnu"]);
    expect(result).toContain("Aucun fichier ou dossier de ce type");
  });

  it("crée un fichier avec touch puis le rend visible dans ls", async () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.touch(["test.txt"]);
    expect(result).toBe("");

    await waitFor(() => {
      const lsResult = latestTerminalProps?.commands.ls([]);
      expect(lsResult).toContain("test.txt");
    });
  });

  it("crée un dossier avec mkdir puis le rend visible dans ls", async () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.mkdir(["docs"]);
    expect(result).toBe("");

    await waitFor(() => {
      const lsResult = latestTerminalProps?.commands.ls([]);
      expect(lsResult).toContain("docs");
    });
  });

  it("supprime un fichier avec rm", async () => {
    render(<TerminalLinux />);

    latestTerminalProps?.commands.touch(["temp.txt"]);

    await waitFor(() => {
      expect(latestTerminalProps?.commands.ls([])).toContain("temp.txt");
    });

    const result = latestTerminalProps?.commands.rm(["temp.txt"]);
    expect(result).toBe("");

    await waitFor(() => {
      expect(latestTerminalProps?.commands.ls([])).not.toContain("temp.txt");
    });
  });

  it("supprime un dossier vide avec rmdir", async () => {
    render(<TerminalLinux />);

    latestTerminalProps?.commands.mkdir(["tmpdir"]);

    await waitFor(() => {
      expect(latestTerminalProps?.commands.ls([])).toContain("tmpdir");
    });

    const result = latestTerminalProps?.commands.rmdir(["tmpdir"]);
    expect(result).toBe("");

    await waitFor(() => {
      expect(latestTerminalProps?.commands.ls([])).not.toContain("tmpdir");
    });
  });

  it("refuse de supprimer un dossier non vide avec rmdir", async () => {
    render(<TerminalLinux />);

    latestTerminalProps?.commands.mkdir(["docs"]);

    await waitFor(() => {
      expect(latestTerminalProps?.commands.ls([])).toContain("docs");
    });

    latestTerminalProps?.commands.touch(["docs/note.txt"]);

    await waitFor(() => {
      const result = latestTerminalProps?.commands.rmdir(["docs"]);
      expect(result).toBe("rmdir: dossier non vide");
    });
  });

  it("ouvre un mailto avec la commande contact", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<TerminalLinux />);

    latestTerminalProps?.commands.contact();

    expect(openSpy).toHaveBeenCalledWith(
      "mailto:alan.gainie@gmail.com",
      "_blank"
    );
  });

  it("retourne une chaîne vide avec clear", () => {
    render(<TerminalLinux />);

    const result = latestTerminalProps?.commands.clear();
    expect(result).toBe("");
  });
});