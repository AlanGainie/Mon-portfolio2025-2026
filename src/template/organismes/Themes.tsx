import { THEMES } from '../../styles/tw';
import Pastel from '../composants/effects/Pastel.tsx';

export default function Theme({nbr, colors}: {nbr: number, colors?: string[]}) {

    return (
        <div className={`${THEMES}`}>
            <li className="nav-item ms-3">
                <svg id="themeSelector" width="500" height="150" style={{stroke: "white", strokeWidth: 1}}>
                    {colors && colors.map((color) => (
                        <Pastel color={color}/>
                    ))}
                    {nbr}
                </svg>
            </li>
        </div>
    )
}