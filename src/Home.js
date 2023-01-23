
import React from "react";
import { useEffect } from "react";

function Home() {
    useEffect(() => {
        document.title = "Chess Boards"
    }, []);
    return(
        <div>
            <h1>Chess Boards</h1>

        </div>
    );
}

export default Home;