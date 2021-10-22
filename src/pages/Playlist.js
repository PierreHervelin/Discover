import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import Load from '../components/Load';
import { Interval, writeEffect } from '../functions/Animations';
import { AccessToken } from '../functions/Auth';
import { getUserPlaylist } from '../functions/GetElements';

const Playlist = () => {
    const onHover=(e)=>{
        const span=e.target.nextSibling
        if(span){
            span.style.display='inline'
            span.dataset.display='show'
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
            span.dataset.display='hidden'
            span.style.display='none'
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
                    href={`/playlist/open#access_token=${AccessToken}`}
                    onMouseEnter={onHover} 
                    onMouseOut={onOut}
                >
                    <span>Open</span>
                    <span>Open an existing playlist</span>
                </a>
            </div>
            <Load/>
        </main>
    );
};

export default Playlist;