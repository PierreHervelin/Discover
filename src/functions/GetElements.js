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
    return json;
}