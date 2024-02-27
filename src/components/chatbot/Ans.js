import React, {useEffect, useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';


const Ans= ({msg})=>{
   const [mess,setMess] =  useState ("generating answers ........");
    const { speak } = useSpeechSynthesis();
    useEffect(() => {
        speak({ text: msg})
      }, [msg]);
    return(
        <div style={{color:"black"} }  onLoad={(msg)=>{setMess(msg) ; }}>{msg}</div>
    );
}
export default Ans;