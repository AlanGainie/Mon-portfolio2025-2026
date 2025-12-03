// import { useState } from 'react';
import { FLEXCOL } from '../../styles/tw';
import identity_picture from '../../assets/picture/IMG_20250129_092536_199.jpg';
import Crop from '../composants/Crop';
import ButtonTypewriter from '../composants/Typewriter';

{/* Drapeau animé */}
// function Flag() {
//   const [reveal, setReveal] = useState(false);
  
//   const handleClick = () => {
//     setReveal(true);
//   };

//   return (
//     <div className='w-full h-50'>
//       <div
//         className={`relative w-full cursor-pointer overflow-hidden flag-container ${reveal ? 'reveal' : ''}`}
//         onClick={handleClick}
//       >
//         <img src="../../assets/picture/Flag_of_Brittany_(Gwenn_ha_du).svg" alt="Drapeau" className="w-full h-full object-cover flag" />
//         {!reveal && (
//           <div className="absolute inset-0 bg-black/80 mask z-10 transition-all duration-700"></div>
//         )}
//       </div>
//     </div>
//   )
// }

// TODO: Travailler le flag et faire une bannière
function HomePage() {

  return (
    <div className={FLEXCOL}>
      < h1 > Bienvennue sur mon portfolio informatique.</h1 >
      <br />
      <Crop
        path={identity_picture}
        height={500} width={500}
        errorloadtext="photo d'identité"
        legende="Photo d'identité mai 2025 "/>
      <br /> 
      {ButtonTypewriter ("Bienvenue sur mon portfolio informatique")}
    </div>
  )
}

export default HomePage