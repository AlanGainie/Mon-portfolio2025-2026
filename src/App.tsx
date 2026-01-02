// Se portfolio est réaliser en React 19 de fais quelques signature classique
// comme JSX.Element deviennent à présent : React.JSX.Element toutefois je suis
// en Typescript 5

import './styles/index.css'
import './styles/tw.ts';
import { useState } from 'react';

// import Carrousel from './template/composants/Carrousel.tsx';
import { GLOBALMENUE, PAGESGLOBAL } from './styles/tw.ts';
// import Theme from './template/organismes/Themes.tsx';
import Page from './template/composants/Page.tsx';
import { Menue, ContentMenues } from './template/composants/Menue.tsx';

function App() {
  const [actual_list_menue, setActuallistMenue] = useState(0);
  // const [showTerminal, setShowTerminal] = useState(false);

  return (
    <>
      {/* Définir une taille de fenêtre de + de 2000px pour pouvoir scroll down ou up */}
      <div className={`${PAGESGLOBAL}`}>
        <div className={`${GLOBALMENUE}`}>
          <Menue
            actual_list_menue={actual_list_menue}
            setActuallistMenue={setActuallistMenue}
          />
        </div>
        {actual_list_menue !== null && <Page
          content={<ContentMenues actualmenue={actual_list_menue}/>}
          type={undefined}
          />}
      </div >
    </>
  );
}

export default App;
