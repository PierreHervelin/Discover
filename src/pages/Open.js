import React, { useState } from 'react';
import Load from '../components/Load'
import Playlists from '../components/Playlists';

const Open = () => {
    const [playlistName,setPlaylistName]=useState('')
    return (
        <main id='Open'>
            <div className='searchBar'>
                <label>What's her name ?</label>
                <div>
                    <input
                        type='text'
                        onChange={(e)=>{
                            setPlaylistName(e.target.value)
                        }}
                        value={playlistName}
                    />
                    <div/>
                    <div/>
                </div>
            </div>
            <div className='playlists'>
                <Playlists playlistName={playlistName}/>
            </div>
            <Load/>
        </main>
    );
};

export default Open;