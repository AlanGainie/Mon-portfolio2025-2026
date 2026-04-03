import { useState } from "react";
import Button from "./Button.tsx";
import { BUTTONCROLLDOWN } from "../../styles/tw.ts";

function Croll({ name }: { name?: string }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollPage = () => {
        const newScroll = scrollPosition + 100; // Pixels à scroller en plus
        window.scrollTo({
            top: newScroll,
            behavior: "smooth",
        });
        setScrollPosition(newScroll);
    };

    return (
        <Button
            InternClassName={BUTTONCROLLDOWN}
            icon="arrowdown"
            name={name ? name : " "}
            onClick={scrollPage}
            disabled
        />
    );
}

export default Croll;
