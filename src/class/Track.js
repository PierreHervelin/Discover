import { msToTime } from "../functions/Utility"

export class Track{
    image
    audio
    title
    date
    duration
    constructor(track){
        this.image=track.album.images[0].url
        this.audio=(track.preview_url)?new Audio(track.preview_url):undefined
        this.title=track.name
        this.date=track.album.release_date.substr(0,4)
        this.duration=msToTime(track.duration_ms)
    }
}