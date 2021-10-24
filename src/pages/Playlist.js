import React from 'react';
import Load from '../components/Load';
import { writeEffect } from '../functions/Animations';
import { AccessToken } from '../functions/Auth';

const Playlist = () => {
    const onHover=(e)=>{
        const span=e.target.nextSibling
        if(span){
            span.style.display='inline'
            switch (e.target.innerHTML) {
                case 'Open':
                    writeEffect(span,'an existing playlist')
                    break
                case 'New':
                    writeEffect(span,'playlist from scratch')
                    break
                default:
                    break
            }
        }
    }
    const onOut=(e)=>{
        const span=e.target.nextSibling
        if(span){
            span.style.display='none'
        }
    }
    const onClick=(e)=>{
        const parent=e.target.parentNode
        if(parent){
            parent.style.opacity=0
            setTimeout(() => {
                let divs
                switch (e.target.innerHTML) {
                    case 'Open':
                        divs=document.querySelectorAll('.openPlaylist div')
                        setTimeout(() => {
                            document.getElementById('gotoOpen').click()
                        }, 700);
                        break
                    case 'New':
                        divs=document.querySelectorAll('.newPlaylist div')
                        setTimeout(() => {
                            document.getElementById('gotoNew').click()
                        }, 700);
                        break
                    default:
                        break
                }
                for(let div of divs){
                    div.style.opacity=1
                    div.style.transform='translate(-50%,-50%) scale(1)'
                }
            }, 500);
        }
    }
    return (
        <main id='Playlist'>
            <div className='choose'>
                <a onMouseEnter={onHover} onMouseOut={onOut}>
                    <span>New</span>
                    <span>Create playlist from scratch</span>
                </a>
                <a 
                    onMouseEnter={onHover} 
                    onMouseOut={onOut}
                    onClick={onClick}
                >
                    <span>Open</span>
                    <span>Open an existing playlist</span>
                </a>
            </div>
            <div className='clickAnim'>
                <div className='newPlaylist'>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className='openPlaylist'>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
            <a href={`/playlist/open#access_token=${AccessToken}`} id='gotoOpen'></a>
            <a href={`/playlist/new#access_token=${AccessToken}`} id='gotoNew'></a>
            <Load/>
        </main>
    );
};

export default Playlist;