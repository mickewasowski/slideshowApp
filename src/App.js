import React from 'react';
import './App.css';
import 'h8k-components';
import { useEffect, useState } from 'react';

import Slides from './components/Slides';
const title = "Slideshow App";

function App({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(null);
    const [btnNext, setBtnNext] = useState(false);
    const [btnPrev, setBtnPrev] = useState(false);
    const [btnRestart, setBtnRestart] = useState(true);

    useEffect(() => {
        setCurrentSlide(slides[0]);
    }, []);


    const handleNext = (event) => {
        const index = slides.findIndex(x => x.title === currentSlide.title);

        if (btnPrev) {
            setBtnPrev(false);
        }

        if ((index + 1) < slides.length) {
            setCurrentSlide(slides[index + 1]);
            setBtnRestart(false);
        }

        if ((index + 1) === (slides.length - 1)) {
            setBtnNext(true);
        } else {
            setBtnNext(false);
        }
    }

    const handlePrevious = (event) => {
        const index = slides.findIndex(x => x.title === currentSlide.title);

        if (btnNext) {
            setBtnNext(false);
        }

        if ((index - 1) >= 0) {
            setCurrentSlide(slides[index - 1]);
        }

        if ((index - 1) === 0) {
            setBtnPrev(true);
            setBtnRestart(true);
        } else {
            setBtnPrev(false);
        }
    }

    const handleRestart = (event) => {
        setCurrentSlide(slides[0]);
        setBtnRestart(true);
    }


    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" onClick={handleRestart} disabled={btnRestart}>Restart</button>
                <button data-testid="button-prev" className="small" onClick={handlePrevious} disabled={btnPrev}>Prev</button>
                <button data-testid="button-next" className="small" onClick={handleNext} disabled={btnNext}>Next</button>
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

export default App;
