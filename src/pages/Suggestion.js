import React, { useEffect, useState } from 'react';
import Load from '../components/Load';
import { Tracklist } from '../components/Tracklist';

export const Extract=new Audio()


const Suggestion = () => {
    const [volume,setVolume]=useState(0.5)
    const [volumeState,setVolumeState]=useState('down')
    let width=volume*100
    const [temp,setTemp]=useState(0)

    Extract.volume=volume
    
    useEffect(()=>{
        if(volume>0.6){
            setVolumeState('up')
        }else if(volume<=0.6&&volume>0){
            setVolumeState('down')
        }else if(volume==0){
            setVolumeState('mute')
        }
        if(width<=30&&width>10){
            setTemp(4)
        }else if(width<=10){
            setTemp(6)
        }else if(width>30&&width<=80){
            setTemp(0)
        }else if(width>80){
            setTemp(-2)
        }
    })

    useEffect(() => {
        setTimeout(() => {
            const intro=document.querySelectorAll('.intro')
            for(let  i of intro){
                i.remove()
            }
        },3200)
    })
    return (
        <main id='Suggestion'>
            <h2>You have to listen to these songs,</h2>
            <Tracklist/>
            <Load/>
            <div className='volume'>
                <div className='volume-bar-container'>
                    <div className='volume-bar'>
                        <input 
                            type='range'
                            onChange={(e)=>setVolume(e.target.value/100)}
                            value={volume*100}
                        />
                        <div
                            style={{width:`${width+temp}%`}}
                        />
                    </div>
                </div>
                <button 
                    className={`icon-volume-${volumeState}`}
                    onClick={()=>setVolume(0)}
                />
            </div>
        </main>
    );
};

export default Suggestion;