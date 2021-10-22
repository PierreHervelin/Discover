export const getSeedArtists=(items)=>{
    let artists={}
    for(let i of items){
        for(let artist of i.track.artists){
            if(artists[artist.name]){
                artists[artist.name]+=1
            }else{
                artists[artist.name]=1
            }
        }
    }
    console.log(artists);
}