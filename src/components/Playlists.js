import React, { useEffect, useState } from 'react';
import { Playlist } from '../class/Playlist';
import { AccessToken } from '../functions/Auth';
import { getUserPlaylist } from '../functions/GetElements';
import { usePrevious } from '../functions/Utility';
import Loading from './Loading';

const AllPlaylists=[]
let isLoad=false

const Playlists = (props) => {
    const [playlists,setPlaylists]=useState([])

    const getAllPlaylists=()=>{
        return new Promise((resolve)=>{
            const loading=document.querySelector('.progress-bar')
            const interval=setInterval(async() => {
                const response=await getUserPlaylist({limit:50,offset:AllPlaylists.length})
                for(let playlist of response.items){
                    AllPlaylists.push(playlist)
                    loading.style.width=`${(AllPlaylists.length*100)/response.total}%`
                }
                console.log(response.total,AllPlaylists.length);
                if(AllPlaylists.length>=response.total){
                    clearInterval(interval)
                    isLoad=true
                    resolve('done')
                    return
                }
            }, 600);
        })
    }

    const getPlaylists=async()=>{
        if(!AllPlaylists.length){
            await getAllPlaylists()
            console.log(AllPlaylists);
        }
        let temp=[]
        for(let i of AllPlaylists){
            if(i.images.length&&i.name.indexOf(props.playlistName)===0){
                temp.push(new Playlist(i))
                console.log(i);
                if(temp.length===3) break
            }
        }
        setPlaylists(temp)
    }

    const prev=usePrevious(props.playlistName)
    useEffect(()=>{
        if(props.playlistName!=prev){
            getPlaylists()
        }
    })

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
                    <div>{`${playlists[i].total} tracks`}</div>
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
    if(!isLoad){
        return(
            <Loading/>
        )
    }
    return (
        <div>no results :(</div>
    )
};

export default Playlists;