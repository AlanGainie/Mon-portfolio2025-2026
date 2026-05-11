import { JSX, useState } from "react";

import "../../styles/index.css";
import "../../styles/tw.ts";

function DemoPopupSection(): JSX.Element | null {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside className="demo-popup" role="status">
      <div className="demo-popup-header">
        <div className="demo-popup-title">
          <span className="demo-dot" />
          <span>Mode démo</span>
        </div>

        <button
          type="button"
          className="demo-popup-close"
          onClick={() => setVisible(false)}
          aria-label="Fermer la popup mode démo"
        >
          ×
        </button>
      </div>

      <p>Vous consultez la version démonstration du portfolio.</p>
    </aside>
  );
}

export default DemoPopupSection;