import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Playlist } from '../class/Playlist';
import { AccessToken } from '../functions/Auth';
import { getUserPlaylist } from '../functions/GetElements';

const Playlists = (props) => {
    const [playlists,setPlaylists]=useState([])

    const getPlaylists=async()=>{
        const response=await getUserPlaylist({limit:50})
        let temp=[]
        for(let i of response.items){
            if(i.name.indexOf(props.playlistName)===0){
                temp.push(new Playlist(i))
                if(temp.length===3) break
            }
        }
        setPlaylists(temp)
    }

    getPlaylists()

    if(playlists.length>0){
        const children=[]
        for(let i in playlists){
            children.push(
                <div key={i} className='playlist'
                    onClick={(e)=>{
                        if(e.target.lastElementChild){
                            e.target.lastElementChild.click()
                        }else{
                            e.target.parentNode.lastElementChild.click()
                        }
                    }}
                >
                    <div style={{backgroundImage:`url(${playlists[i].image})`}}/>
                    <div>{playlists[i].name}</div>
                    <a href={`/suggestion?id=${playlists[i].id}#access_token=${AccessToken}`}></a>
                </div>
            )
        }
        return (
            <div className='playlist-container'>
                {children}
            </div>
        )
    }
    return (
        <div>no results :(</div>
    )
};

export default Playlists;