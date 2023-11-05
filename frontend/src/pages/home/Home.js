import React, {useCallback} from "react";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faChartLine, faClock } from "@fortawesome/free-solid-svg-icons";

import { Header, Footer } from "../../containers";
import { FeatureCard, PopUp, Hero } from "../../components";
function Home() {
    const context = useOutletContext();
    const [message, setMessageHandler] = context.messageContext;
    let popUp = null;
    
    const closePopUpHandler = () => {
        setMessageHandler();
    }

    if (message) {
        popUp = <PopUp closePopUpHandler={closePopUpHandler} message={message}/>
    }

    return (
      <>
          <Hero>
          </Hero>
          {popUp}
          <section className="col-span-full text-center py-10 lg:px-32 px-10 bg-main">
            <h2 className="mb-20 text-3xl font-bold text-white">Why is it so great?</h2>
            <div className="grid lg:grid-cols-3 lg:gap-x-20">
              <FeatureCard title='Retention-Driven Interview Prep' 
              description='Seamlessly integrate retention-focused learning into your interview preparation, 
              enhancing both your knowledge base and your ability to shine in high-pressure technical interviews.'
              icon={<FontAwesomeIcon icon={faClock} fontSize={30}/>}
              />
              <FeatureCard title='Smart Spaced Repetition' 
              description='Reinforce your knowledge through intelligent flashcards. 
              Our spaced repetition system schedules review sessions at optimal intervals, helping you memorize key concepts and algorithms effortlessly.'
              icon={<FontAwesomeIcon icon={faBrain} fontSize={30}/>}
              />
              <FeatureCard title='Progress Analytics and Performance Metrics' 
              description='Track your learning journey with detailed analytics and performance metrics. 
              Receive insights into your strengths and weaknesses, monitor your study patterns, and set achievable goals.'
              icon={<FontAwesomeIcon icon={faChartLine} fontSize={30}/>}
              />
            </div>
          </section>
      </>
    );
}

export default Home;