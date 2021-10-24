import axios from "axios"
import { AccessToken } from "./Auth"

export const addItemsToPlaylist=async(uris,idPlaylist)=>{
    const headers={
        'Authorization': `Bearer ${AccessToken}`  
    }
    const article={uris}
    const response=await axios.post(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`,article,{headers})
    return response.data
}