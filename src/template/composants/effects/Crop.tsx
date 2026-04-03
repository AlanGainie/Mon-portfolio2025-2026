import error_picture from '../../assets/icones/errorPicture.svg';
import { FLEXCOL, TEXTLEGENDE } from '../../styles/tw';

function Crop({path, height, width, errorloadtext, className, legende}:
  {path: string, height: number, width: number, errorloadtext?: string, className?: string, legende?: string}) {

  let error = "no error";
  const heightVal = typeof height === "number" ? `${height}px` : height;
  const widthVal = typeof width === "number" ? `${width}px` : width;

  if (!heightVal || !widthVal)
    error = "error width or height unisielized";
  return (
    <>
      <div>
        <div
          className={error != "no error" ? FLEXCOL : `${FLEXCOL} border rounded overflow-hidden flex items-center justify-center`}
          style={{ width: widthVal, height: heightVal }}>
          <img
            className={`${className ?? ""} object-contain border rounded`}
            alt={errorloadtext ? errorloadtext : "no description picture"}
            src={path && (error == "no error") ? path : error_picture}/>
          {error != "no error" ? error : ""}
        </div>
        <div className={TEXTLEGENDE}>
          {legende ? legende : ""}
        </div>
      </div>
    </>
  )
}

export default Crop