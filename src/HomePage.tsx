import React from 'react';
import { useState } from 'react';


function HomePage() {
  const [reveal, setReveal] = useState(false);

  const handleClick = () => {
    setReveal(true);
  };

  return (
    <>
      {/* Drapeau animé */}
      <div className='flex justify-center w-full mt-10'>
        <div
          className={`relative w-full cursor-pointer overflow-hidden flag-container ${reveal ? 'reveal' : ''}`}
          onClick={handleClick}
        >
          <img src="../src/assets/picture/Flag_of_Brittany_(Gwenn_ha_du).svg" alt="Drapeau" className="w-full h-full object-cover flag" />
          {!reveal && (
            <div className="absolute inset-0 bg-black/80 mask z-10 transition-all duration-700"></div>
          )}
        </div>
      </div>
      {/* Début de l'introduction */}
      < h1 > Bienvennue sur mon portfolio informatique.</h1 >
      <img className="w-[70%]" alt="html image example" src="../src/assets/picture/IMG_20250129_092536_199.jpg" />
      <hr />
      <p>Bienvennue sur mon portfolio informatique </p>
    </>
  )
}

export default HomePage