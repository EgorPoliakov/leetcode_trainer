import React from "react";
import { useOutletContext } from "react-router-dom";
import { Header, Footer } from "../../containers";
import { PopUp } from "../../components";
function Home() {
    const [message, setMessage] = useOutletContext();
    let popUp = null;
    const closePopUpHandler = () => {
        setMessage();
    }

    if (message) {
        popUp = <PopUp closePopUpHandler={closePopUpHandler} message={message}/>
    }

    return (
        <>
            <Header showHero={true} setMessageHandler={setMessage}/>
            {popUp}
            <Footer />
        </>
    );
}

export default Home;