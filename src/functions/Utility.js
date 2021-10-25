import { useEffect, useRef } from "react";

export const msToTime=(millisec)=>{
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}

export const randomPickInArray=(array,n)=>{
    const shuffled=array.sort(() => 0.5 - Math.random())
    let selected=shuffled.slice(0, n)

    return selected
}

export const usePrevious=(val)=>{
    const ref=useRef();
    useEffect(()=>{
        ref.current=val
    })
    return ref.current
}