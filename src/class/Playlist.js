export class Playlist{
    id
    image
    name
    total
    constructor(item){
        this.id=item.id
        this.image=item.images[0].url
        this.name=item.name
        this.total=item.tracks.total
    }
}