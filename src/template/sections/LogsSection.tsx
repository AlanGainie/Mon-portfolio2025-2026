import type { AuthLog } from "../routes/RouteLogin";

type LogsSectionProps = {
  logs: AuthLog[];
  onClearLogs: () => void;
};

export default function LogsSection({ logs, onClearLogs }: LogsSectionProps) {
  return (
    <section className="logs-section">
      <div className="logs-header">
        <h3>Logs</h3>

        <button type="button" onClick={onClearLogs}>
          Effacer
        </button>
      </div>

      <div className="logs-box">
        <div className="logs-scroll">
          {logs.length === 0 ? (
            <div className="logs-empty">Aucun log pour le moment.</div>
          ) : (
            <ul className="logs-list">
              {logs
                .slice()
                .reverse()
                .map((log) => (
                  <li
                    key={log.id}
                    className={`log-item log-${log.action} log-${log.role}`}
                  >
                    <div className="log-content">
                      <div className="log-side">
                        <span className="log-icon">
                          {log.action === "login" && "🔓"}
                          {log.action === "logout" && "🚪"}
                          {log.action === "error" && "⚠️"}
                          {log.action === "blocked" && "🔒"}
                          {log.action === "unblocked" && "🔓"}
                        </span>

                        <div>
                          <strong>{log.username}</strong>
                          <div className="log-date">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <div className="log-message">
                        {log.message || "Action système"}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}