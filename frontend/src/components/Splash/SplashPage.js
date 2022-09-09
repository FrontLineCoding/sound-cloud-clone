import { NavLink } from "react-router-dom";
import DemoUser from "../DemoUser/DemoUser";
import {cur} from '../../App'
import './SplashPage.css'
import { useEffect, useState } from "react";

const SplashPage = () => {
//TODO: make this a carosuel
    const slides = [
         'Already a user? You know how to enjoy the vibes. Sign in and carry on',
         'Not already a user? Sign up to enjoy the vibes. Sign on in and explore',
         'Just Lookin? We Don\'t Blame You. Click that Demo User. Go Ahead. Poke Around'
    ]
    const [selected, setSelected] = useState(0);
    const [val, setVal] = useState(0);
    // let val = 0;
    // useEffect(()=> {
    //     console.log('effect ',val);
    //     setSelected(val)
    // }, [val])
    //     setInterval(() => {
    //         //if condintionals to loop through slides and set a dynamic variable
    //         console.log('val  ', val);
    //         console.log('selected ', selected);
    //         if(val < 2){
    //             // val = val + 1;/
    //             setVal(val + 1)
    //         }else{
    //             // val = 0;
    //             setVal(0);
    //         }
    //     }, 3000)



    return (
        <div className="main-box">
            <p className="slides">{slides[selected]}</p>
        </div>
    )
}

export default SplashPage;
