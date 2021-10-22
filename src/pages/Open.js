import React from 'react';
import Load from '../components/Load'

const Open = () => {
    return (
        <main id='Open'>
            <div className='searchBar'>
                <label>What's her name ?</label>
                <input
                    type='text'
                />
            </div>
            <div className='playlists'></div>
            <Load/>
        </main>
    );
};

export default Open;