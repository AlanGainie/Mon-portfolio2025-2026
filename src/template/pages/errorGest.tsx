type ErrorType =
  | "not_found"
  | "network"
  | "database"
  | "path"
  | "input"
  | "unknown";

type ErrorStateProps = {
  type?: ErrorType;
  target?: string;
  customTitle?: string;
  customMessage?: string;
};

function ErrorState({
  type = "unknown",
  target = "élément",
  customTitle,
  customMessage,
}: ErrorStateProps) {
  const errorMap: Record<
    ErrorType,
    {
      icon: string;
      title: string;
      message: string;
      advice: string;
    }
  > = {
    not_found: {
      icon: "🔎",
      title: `${target} introuvable`,
      message: `Le ${target} demandé n'a pas pu être trouvé.`,
      advice:
        "Vérifie le contenu demandé, recharge la page, ou retourne au menu précédent.",
    },
    network: {
      icon: "🌐",
      title: "Erreur de connexion",
      message: "La connexion au service a échoué ou a été interrompue.",
      advice:
        "Vérifie ta connexion internet puis réessaie dans quelques instants.",
    },
    database: {
      icon: "🗄️",
      title: "Erreur de base de données",
      message: "Les données n'ont pas pu être chargées correctement.",
      advice:
        "Recharge la page ou contacte le support si le problème persiste.",
    },
    path: {
      icon: "📁",
      title: "Chemin invalide",
      message: "Le chemin ou la ressource ciblée est incorrect(e).",
      advice:
        "Vérifie le path utilisé ou retourne à la page précédente.",
    },
    input: {
      icon: "⌨️",
      title: "Erreur de saisie",
      message: "Les informations fournies semblent invalides ou incomplètes.",
      advice:
        "Corrige la saisie puis essaie à nouveau.",
    },
    unknown: {
      icon: "⚠️",
      title: "Erreur inconnue",
      message: "Une erreur inattendue est survenue.",
      advice:
        "Recharge la page ou contacte le support si le problème continue.",
    },
  };

  const currentError = errorMap[type];

  return (
    <div className="error-state">
      <div className="error-state__icon">{currentError.icon}</div>

      <h2 className="error-state__title">
        {customTitle || currentError.title}
      </h2>

      <p className="error-state__message">
        {customMessage || currentError.message}
      </p>

      <p className="error-state__advice">{currentError.advice}</p>

      <div className="error-state__actions">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="error-state__button"
        >
          Rafraîchir
        </button>

        <button
          type="button"
          className="error-state__button error-state__button--secondary"
        >
          Aide
        </button>
      </div>

      <p className="error-state__footer">Désolé du dérangement.</p>
    </div>
  );
}

export default ErrorState;