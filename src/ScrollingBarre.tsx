import { useState } from "react";
import Button from "./Button.tsx";

function ScrollingBarre({ name }: { name?: string }) {
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
        <div className="fixed top-5 right-5 flex flex-col bg-gray-300 rounded-lg border-cyan-500 border-4 h-64 w-10 justify-center items-center">
            <Button
                InternClassName="rounded-full bg-green-500 p-2 text-white"
                name="↓"
                onClick={scrollPage}
                focus={false}
            />
        </div>
    );
}

export default ScrollingBarre;
