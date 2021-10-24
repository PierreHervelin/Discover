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
        this.audio=(track.preview_url)?new Audio(track.preview_url):undefined
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

    async build(){
        this.features=await getTrackFeatures(this.id)
    }
    getGenre(){
        return new Promise((resolve)=>{
            let i=0
            let genres=[]
            const interval=setInterval(async() => {
                if(i===this.artists.length){
                    clearInterval(interval)
                    resolve(genres)
                    return
                }
                const artist=await getArtist(this.artists[i])
                for(let i in artist.genres){
                    if(!genres.includes(artist.genres[i])){
                        genres.push(artist.genres[i])
                    }
                }
                i++
            }, 300);
        })
    }
}