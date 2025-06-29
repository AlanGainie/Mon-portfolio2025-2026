import React from 'react';

function ErrorGest({ name }: { name: string }) {
  return (
    <div>
      <h1>Ereur {name} introuvable veuillez retenter plus tard.</h1>
      <p>L'érreur peu vennir d'une erreur de saisi, de path, de connection à la DB ou bien d'autres encore. <br />
        Afin de cibler l'erreur que vous avez vous pouvez raffraichir la page (Le problem pourra peu être être régler) <br />
        Ou demander de l'aide au support en cliquant sur le <b>bouton d'aide</b>.
      </p>
      <p>Désoler du dérangement.</p>
    </div>
  )
}

export default ErrorGest