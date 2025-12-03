import { useState, useEffect } from "react";
import Button from "./Button";

function TypingEffect({ text = "", speed = 100 }: { text?: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setDisplayedText(""); 
    setFinished(false);
    const characters = Array.from(text);

    if (characters.length === 0) return;

    let index = 0;
    setDisplayedText(characters[0]); // affiche le premier caractère

    const timer = setInterval(() => {
      if (index >= characters.length -1) {
        clearInterval(timer);
        setFinished(true);
        return;
      }
      setDisplayedText((prev) => prev + characters[index]);
      index++;
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  // Gestion des 3 derniers caractères
  const last3 = displayedText.slice(-3).split("");
  const normalText = displayedText.slice(0, -3);

  const shades = ["#555555", "#888888", "#aaaaaa"]; // foncé → moyen → clair

  return (
    <div style={{ fontSize: "20px", fontFamily: "monospace" }}>
      {finished ? (
        <>
          <span className="text-black">{displayedText}</span>
          {/* Curseur clignotant après la fin */}
          <span className="ml-0.5 inline-block w-1 h-6 bg-black animate-blink"> I</span>
        </>
      ) : (
        <>
          {normalText}
          {last3.map((char, i) => (
            <span key={i} style={{ color: shades[i] }}>
              {char}
            </span>
          ))}
        </>
      )}
      {/* Définition de l'animation blink directement dans le JSX */}
      <style>{`
        @keyframes blink {
          0%, 40%, 100% { opacity: 1; }  /* visible plus longtemps */
          50%, 90% { opacity: 0; }       /* invisible plus court */
        }

        .animate-blink {
          animation: blink 1.4s step-start infinite;
        }
      `}</style>
    </div>
  );
}

function Typewriter({
  displaystart,
  content,
  speed,
}: {
  displaystart: boolean;
  content?: string;
  speed?: number;
}) {
  if (content === undefined || content === null)
    content = "Contenue non reseigner...";
  if (speed === undefined || speed === null)
    speed = 80;

  return (
    <>
      {displaystart && <TypingEffect text={content} speed={speed} />}
    </>
  );
}

// Nouveau Typewriter qui accepte du texte dynamique
function TypewriterDynamic({ text = "", speed = 80 }: { text: string; speed?: number }) {
  return <TypingEffect text={text} speed={speed} />;
}

// Nouveau bouton
export function ButtonLinkwriter({ text = "" }: { text?: string }) {
  const [content, setContent] = useState("");

  const handleClick = (newText: string) => {
    setContent(prev => prev + newText); // ajoute le texte sans réinitialiser
  };

  return (
    <div className="space-y-4">
      <Button
        name="Ajouter du texte"
        InternClassName="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => handleClick(text ? text : " Nouveau texte ajouté.")}/>
      <TypewriterDynamic text={content} />
    </div>
  );
}

// Composant principal exporté
export default function ButtonTypewriter(content?: string) {
  const [start, setStart] = useState(false);

  const handleClick = () => {
    setStart(false);          // reset pour remonter le composant
    setTimeout(() => setStart(true), 10); // relance l’animation
  };

  return (
    <div>
      <Button onClick={handleClick} name="Démarrer la machine à écrire"/>
      <Typewriter displaystart={start} content={content ? content : undefined}/>
    </div>
  );
}

