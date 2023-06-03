// import "./slider.scss";
import { useEffect, useState } from "react";

export default function Slider({ min, max, value, handleChange, type, color }) {

    const minGap = 0;
    
    const slider1 = document.getElementById('slider1');
    const slider2 = document.getElementById('slider2');

    const [val1, setMin] = useState(parseInt(slider1.value))
    const [val2, setMax] = useState(parseInt(slider2.value))
    
    const sliderOne = () => {
        if(val2 - val1 <= minGap) {
            slider1.value = parseInt(slider2.value) - minGap;
        }
    }   
    
    const sliderTwo = () => {

    }

    useEffect(() => {
        // setMin(min)
        // setMax(max)
    }, [])

    return (
        type !== "double" ? (
            <div className="slider">
                <div className="slider-track" style={{color}}></div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    // onChange={handleChange}
                />
            </div>
        ) : (
            <div className="slider">
                <div className="slider-track" style={{color}}>

                </div>
                <input
                    type="range"
                    name="slider1"
                    id="slider1"
                    min={min}
                    max={max}
                    value={value[0]}
                    // step="0.1"
                    onChange={handleChange}
                ></input>

                <input
                    type="range"
                    name="slider2"
                    id="slider2"
                    min={min}
                    max={max}
                    value={value[1]}
                    // step="0.1"
                    onChange={handleChange}
                ></input>
                {/* <input type="range" id="volume" name="volume" min="0" max="11" value="7"></input> */}
            </div>
        )
    );
}
