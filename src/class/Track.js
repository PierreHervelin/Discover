import { getArtist, getTrackFeatures } from "../functions/GetElements"
import { msToTime } from "../functions/Utility"

export class Track{
    id
    image
    audio
    title
    date
    duration
    uri
    isPush=false
    artists=[]
    artistsName=[]
    features=null
    constructor(track){
        this.image=track.album.images[0].url
        this.audio=(track.preview_url)?track.preview_url:null
        this.title=track.name
        this.date=track.album.release_date.substr(0,4)
        this.duration=msToTime(track.duration_ms)
        this.id=track.id
        this.uri=track.uri
        for(let artist of track.artists){
            this.artists.push(artist.id)
            this.artistsName.push(artist.name)
        }
    }
}