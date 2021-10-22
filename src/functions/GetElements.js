import axios from "axios";
import { AccessToken } from "./Auth";

const headers=new Headers({
    'Authorization': `Bearer ${AccessToken}`,
    'Content-Type': 'application/json'
})

export const getAlbum=async(idAlbum)=>{
    const response=await fetch(
        `https://api.spotify.com/v1/albums/${idAlbum}`,
        {
            method:'get',
            headers
        }
    )
    const json=await response.json()
    return json;
}

export const getArtist=async(idArtist)=>{
    const response=await fetch(
        `https://api.spotify.com/v1/artists/${idArtist}`,
        {
            method:'get',
            headers
        }
    )
    const json=await response.json()
    return json;
}

export const getTrack=async(idTrack)=>{
    const response=await fetch(
        `https://api.spotify.com/v1/tracks/${idTrack}`,
        {
            method:'get',
            headers
        }
    )
    const json=await response.json()
    console.log(json);
    return json;
}

export const getElements=async(string,type)=>{
    const response=await fetch(
        `https://api.spotify.com/v1/search/?q=${string}&type=${type}`,
        {
            method:'get',
            headers
        }
    )
    const json=await response.json()
    return json
}

export const getRecommandations=async(params)=>{
    params={
        params,
        headers:{
            'Authorization': `Bearer ${AccessToken}`
        }
    }
    const response = await axios.get("https://api.spotify.com/v1/recommendations/", params)
    return response.data
}

export const getRecentSongs=async(params)=>{
    params={
        params,
        headers:{
            'Authorization': `Bearer ${AccessToken}`
        }
    }
    const response=await axios.get("https://api.spotify.com/v1/me/player/recently-played", params)
    return response.data
}

export const getUserPlaylist=async(params=null)=>{
    params={
        params,
        headers:{
            'Authorization': `Bearer ${AccessToken}`
        }
    }
    const response=await axios.get("https://api.spotify.com/v1/me/playlists", params)
    return response.data
}