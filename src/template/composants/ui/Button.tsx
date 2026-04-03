import { BUTTONCOLORS, FLEXROW } from "../../styles/tw"

//gestion d'erreur
import errorPicture from "../../assets/icones/errorPicture.svg"

//autres
import terminal from "../../assets/icones/terminal.svg"
import cross from "../../assets/icones/cross.svg"
import arrow from "../../assets/icones/arrow.svg"
import more from "../../assets/icones/more.svg"
import etudes from "../../assets/icones/etudes.svg"
import contact from "../../assets/icones/contact.svg"
import home from "../../assets/icones/home.svg"
import cv from "../../assets/icones/cv.svg"
import competence from "../../assets/icones/competence.svg"
import projet from "../../assets/icones/projet.svg"
import scribermachine from "../../assets/icones/scribermachine.svg"

//réseau sociaux
import linkedin from "../../assets/icones/linkedin.svg"
import at from "../../assets/icones/at.svg"
import instagram from "../../assets/icones/instagram.svg"
import x from "../../assets/icones/x.svg"
import github from "../../assets/icones/github.svg"
import wattapps from "../../assets/icones/wattapps.svg"
import pinterest from "../../assets/icones/pinterest.svg"
import stackoverflow from "../../assets/icones/stackoverflow.svg"
import snapchat from "../../assets/icones/snapchat.svg"
import facebook from "../../assets/icones/facebook.svg"
import youtube from "../../assets/icones/youtube.svg"

// secondary page
import react from "../../assets/icones/react.svg"
import js from "../../assets/icones/js.svg"
import c from "../../assets/icones/c.svg"
// import cpp from "../../assets/icones/cpp.svg"
import node from "../../assets/icones/node.svg"
// import typescript from "../../assets/icones/typescript.svg"
// import html from "../../assets/icones/html.svg"
// import css from "../../assets/icones/css.svg"
// import tailwind from "../../assets/icones/tailwind.svg"
// import drive from "../../assets/icones/drive.svg"
// import playstore from "../../assets/icones/playstore.svg"

import jdr from "../../assets/icones/jdr.svg"
import revision from "../../assets/icones/revision.svg"
import personal from "../../assets/icones/personal.svg"

import arrowdown from "../../assets/icones/arrowdown.svg"

function SetIcon(icon: string) {
  switch (icon) {
    case "terminal":
      return terminal;
    case "cross":
      return cross;
    case "arrow":
      return arrow;
    case "more":
      return more;
    case "etudes":
      return etudes;
    case "contact":
      return contact;
    case "home":
      return home;
    case "competence":
      return competence;
    case "projet":
      return projet;
    case "cv":
      return cv;

    case "linkedin":
      return linkedin;
    case "instagram":
      return instagram;
    case "x":
      return x;
    case "at":
      return at;
    case "snapchat":
      return snapchat;
    case "facebook":
      return facebook;
    case "wattapps":
      return wattapps;
    case "stackoverflow":
      return stackoverflow;
    case "pinterest":
      return pinterest;
    case "youtube":
      return youtube;
    case "github":
      return github;

    case "react":
      return react;
    case "js":
      return js;
    case "node":
      return node;
    case "c":
      return c;
    // case "cpp":
    //   return cpp;

    case "jdr":
      return jdr;
    case "revision":
      return revision;
    case "personal":
      return personal;

    case "arrowdown":
      return arrowdown;

    case "scribermachine":
      return scribermachine;

    default:
      return errorPicture;
  }
}

function Button({ name, onClick, icon, InternClassName, clicked, disabled, uncolor }: { name?: string, onClick: React.MouseEventHandler<HTMLElement>, icon?: string, InternClassName?: string,  clicked?: boolean, disabled?: boolean, uncolor?: boolean }) {
  let COLORS = ``;
  let ICONCOLORS = ``;
  if (!uncolor)
    COLORS = `bg-red-500 ${BUTTONCOLORS(clicked, disabled)}`;
  else
    COLORS = `text-white`;
    ICONCOLORS = `text-white`;

  return (
    <>
      <div onClick={onClick} className={InternClassName ? `${FLEXROW} ${InternClassName}` : `${FLEXROW} ${COLORS} rounded-lg`}>
        {icon && <img src={SetIcon(icon)} alt={icon} className={`w-6 h-6 ${ICONCOLORS}`}/>}
        {name}
      </div>
    </>
  )
}

export default Button