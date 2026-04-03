import { PASTEL } from '../../styles/tw';

export default function Pastel({color}: {color: string}) {

    return (
        <g className={PASTEL}>
            <circle cx="150" cy="60" r="20" fill={color ? color : "#E46498"} className="back"/>
            <circle cx="140" cy="70" r="20" fill={color ? color : "#1F2554"} className="front" />
        </g>
    )
}