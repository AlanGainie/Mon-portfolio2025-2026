import bgSvg from '../assets/picture/background.svg';
// import bgJpg from '../assets/picture/background.jpg';

// Vue déveloper
// TODO: HAVE TO FIXED
const developer = false;
export function DEVELOPERVIEW(displayed: true, level: number): string;
export function DEVELOPERVIEW(displayed?: false | undefined, level?: number | undefined): undefined;
export function DEVELOPERVIEW(displayed?: boolean | undefined, level?: number): string | undefined {
    if (!displayed)
        return undefined;
    switch (level) {
        case 1:
            return `border-red-600 border-6`;
        case 2:
            return `border-orange-500 border-6`;
        case 3:
            return `border-green-400 border-6`;
        case 4:
            return `border-yellow-400 border-6`;
        case 5:
            return `border-pink-300 border-6`;
        case 6:
            return `border-blue-200 border-6`;
    }
}

// Agencement de la page
export const FLEXCOL = `flex flex-col md:flex-col`;
export const FLEXROW = `flex flex-row md:flex-row`;
export const GRID = `nothing`;

export const error = "Erreur tailwind pas de mutation disponible";

// Directions
export const DIRECTIONS = (
  position: "top" | "left" | "right" | "bottom" | "center",
  degres?: number | "justify"
) => {
  let base = "";

  if (degres !== undefined) {
    if (degres === "justify" || degres >= 100) {
      switch (position) {
        case "right":
          return "justify-end";
        case "center":
          return "justify-center";
        case "left":
          return "justify-start";
        default:
          return error;
      }
    } else {
      switch (position) {
        case "top":
          return `top-[${degres}%]`;
        case "left":
          return `left-[${degres}%]`;
        case "right":
          return `right-[${degres}%]`;
        case "bottom":
          return `bottom-[${degres}%]`;
        default:
          return error;
      }
    }
  }

  switch (position) {
    case "right":
      return "justify-end";
    case "center":
      return "justify-center";
    case "left":
      return "justify-start";
    default:
      return error;
  }
};

// Animation
export const SLICE = `nothing`;

export const FONDU = (percent?: number) => {
    let opacity = 'hover:opacity-100';
    if (percent)
        switch (true) {
            case percent <= 10:
                opacity = 'hover:opacity-10';
                break;
            case percent > 10 && percent <= 25:
                opacity = 'hover:opacity-25';
                break;
            case percent > 25 && percent <= 50:
                opacity = 'hover:opacity-50';
                break;
            case percent > 50 && percent <= 75:
                opacity = 'hover:opacity-75';
                break;
            case percent > 75 && percent <= 85:
                opacity = 'hover:opacity-85';
                break;
        }
    return `opacity-0 transition-opacity duration-700 ${opacity}`;
}
// ${encodeURIComponent(bgJpg)}
const PAGESGLOBALBG = `bg-[url('/home/againie/Desktop/AppPortefolioReact/Mon-portfolio2025-2026/src/assets/picture/background.svg')] bg-no-repeat bg-cover`
export const PAGESGLOBAL =  `w-full min-h-screen h-full ${PAGESGLOBALBG}`;

// Structure style pages
//___________________________
    const PAGESCROLLDOWNCOLORS = `${DEVELOPERVIEW(developer, 4)} bg-white/80 backdrop-blur-md shadow-2xl`;
    export const PAGESCROLLDOWN = `${FLEXCOL} justify-center w-[80%] mt-[5%] ml-[10%] mr-[10%] mb-[10%] rounded-2xl gap-6 px-4 md:px-8 py-4 md:py-6 ${PAGESCROLLDOWNCOLORS}`;
    export const TOPPAGESCROLLDOWN = `${FLEXCOL} bg-gray-200 rounded-lg border-pink-50 border-7`;
    export const DOWNPAGESCROLLDOWN = `${FLEXCOL} rounded-lg border-pink-50 border-7`;

// Structure style organisme
//___________________________

    // Structure de base menue
    // export const COLORSBARREMENUEV01 = `bg-gray-300 border-yellow-500 border-7`;
    const COLORSBARREMENUE = `nothing`;
    export const NAVBAR = "relative px-5 py-[15px] rounded-[60px] backdrop-blur-[15px] shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 [&_*]:transition-all [&_*]:duration-300 [&_*:hover]:shadow-[0_8px_20px_rgba(0,0,0,0.35)] [&_*:hover]:-translate-y-[2px]"
    export const BARREMENUE = `gap-4 rounded-xl ${COLORSBARREMENUE}`;

    // const BANNIERE = ``;
    export const GLOBALMENUE = `${DEVELOPERVIEW(developer, 1)} ${FLEXROW} ${DIRECTIONS("center")} gap-1 p-1 rounded-xl`;
    export const MENUEBG = `bg-neutral-800 text-green-500 font-semibold transition-colors duration-300 mt-1 ${NAVBAR}`
        // Root Menue
        export const ROOTMENUE = `${developer ? DEVELOPERVIEW(developer, 2) : `nothing` } ${FLEXROW} ${BARREMENUE} justify-center w-[65%] h-full gap-4 px-4 py-2 rounded-lg ${MENUEBG}`;
        // Secondary Menue
        export const SECONDARYMENUE = `${developer ? DEVELOPERVIEW(developer, 2) : `nothing`} ${FLEXCOL} ${BARREMENUE} justify-start bg-[url('${bgSvg}')] w-[15%] h-full p-1 ${MENUEBG}`;
        // Parameter Menue
        export const PARAMETERMENUE = `${developer ? DEVELOPERVIEW(developer, 2) : `nothing`} ${FLEXROW} ${BARREMENUE} justify-end w-[20%] h-full p-1 ${MENUEBG}`;


// Structure style composants
//___________________________

    // Structure de base carouselle
    export const GLOBALCARROUSELLE = `relative w-full max-w-4xl mx-auto shadow-xl select-none`;
    const SLIDECARROUSELLEBG = `bg-white`
    export const SLIDECARROUSELLE = `${FLEXROW} w-full h-96 overflow-hidden items-center justify-center ${SLIDECARROUSELLEBG}`;

    // Structure thèmes
    export const THEMES = `nothing`;
    export const PASTEL = `transition-transform duration-300 ease-in-out`;

    // Structure footer
    const FOOTERCOLORS = `bg-gray-900 text-white shadow-[0_10px_10px_rgba(255,55,0,0.6)]`;
    export const FOOTER = `${DEVELOPERVIEW(developer, 1)} ${FLEXROW} justify-between ${FOOTERCOLORS} w-full p-5 mb-5`;

    // Structure de base buttons
    export const BUTTONCOLORS = (clicked?: boolean, disabled?: boolean) => {
        const COLORHOVER = 'hover:bg-gray-500 opacity-70 border-red-500';
        const COLORSDISABLED = disabled ? '' : COLORHOVER;
        const COLORSCLICKED = clicked ? 'bg-green-500' : '';
        const COLORS = `${COLORSDISABLED} ${COLORSCLICKED} ${COLORHOVER} transition-colors duration-300`;
    
        return COLORS;
    };

    // Bouttons parameters
    const BUTTONPARAMETERSHOVER = "hover:bg-white"
    const BUTTONPARAMETERSCOLORS = `bg-neutral-800 text-green-500 font-semibold transition-colors duration-300`

        // Bouttons croll
        export const BUTTONCROLLDOWN = `${DEVELOPERVIEW(developer, 3)} p-2 rounded-full w-[14%] ${BUTTONPARAMETERSCOLORS} ${BUTTONPARAMETERSHOVER}`;

        // Bouttons terminal
        export const BUTTONTERMINAL = `${DEVELOPERVIEW(developer, 3)} gap-4 px-4 py-2 rounded-lg ${BUTTONPARAMETERSCOLORS} ${BUTTONPARAMETERSHOVER}`

        const BUTTONTERMINALHOVERQUIT = "hover:text-red-500"
        const BUTTONTERMINALCOLORSQUIT = `${DEVELOPERVIEW(developer, 3)} bg-gray-300 text-yellow-300 text-2xl font-bold transition-colors duration-300`
        export const BUTTONTERMINALQUIT = `${FLEXROW} justify-center w-[6%] rounded-xl ${BUTTONTERMINALCOLORSQUIT} ${BUTTONTERMINALHOVERQUIT}`

    // Bouttons carrouselle
    const BUTTONCARROUSELLEARROWHOVER = `hover:bg-opacity-100 transition`
    export const BUTTONCARROUSELLEARROW = `absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-black ${BUTTONCARROUSELLEARROWHOVER}`;
    
    export const BUTTONCARROUSELLEARROWLEFT = `${BUTTONCARROUSELLEARROW} left-2`;
    export const BUTTONCARROUSELLEARROWRIGHT = `${BUTTONCARROUSELLEARROW} right-2`;

    // Texte style
    export const TEXTLEGENDE = `text-gray-400 italic text-[12px]`
