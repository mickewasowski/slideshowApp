import React from 'react';
import { useEffect, useState } from 'react';


function Slides({slides}) {
  const [stateSlides, setStateSlides] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  useEffect(() => {
    const resultArray = [];

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];   

      if (i === 0) {
        const slide = {
          title: slides[i].title,
          text: slides[i].text,
          isDisplayed: true
        }

        resultArray.push(slide);
        setCurrentSlide(slide);
      }
      else{
        const slide = {
          title: slides[i].title,
          text: slides[i].text,
          isDisplayed: false
        }

        resultArray.push(slide);
      }
    }    

    setStateSlides(resultArray);
  }, []);


  const handleOnClick = (event) => {
    console.log(...stateSlides);
    
    for (let i = 0; i < stateSlides.length; i++) {

      if (stateSlides[i].isDisplayed) {
        if (i + 1 < stateSlides.length) {
          const current = { ...stateSlides[i], isDisplayed: false};
          const next = { ...stateSlides[i + 1], isDisplayed: true};
          setStateSlides(...stateSlides, current, next)
          setCurrentSlide(next);
          return;
        }
      }
    }
    
  }


    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined">Restart</button>
                <button data-testid="button-prev" className="small">Prev</button>
                <button data-testid="button-next" className="small" onClick={handleOnClick}>Next</button>
            </div>
            {  
              currentSlide !== null
              ?
                <div id="slide" className="card text-center" key={currentSlide.title}>
                  <h1 data-testid="title">{currentSlide.title}</h1>
                  <p data-testid="text">{currentSlide.text}</p>
                </div>    
              : ''
            }
        </div>
    );

}

export default Slides;
