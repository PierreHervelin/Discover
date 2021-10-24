import React from "react"
import { Track } from "../class/Track"
import { addItemsToPlaylist } from "../functions/addElements"
import { getPlaylist, getPlaylistItems, getRecommandations } from "../functions/GetElements"
import { Card } from "./Card"

export class Tracklist extends React.Component{
    state={
        isLoad:false
    }
    tracks
    idPlaylist
    playlist
    pageLoad=false
    informations={
        index:0,
        genres:[],
        artists:[],
        features:{
            acousticness:0,
            danceability:0,
            energy:0,
            instrumentalness:0,
            liveness:0,
            loudness:0,
            speechiness:0,
            tempo:0
        },
        items:[]
    }
    constructor(){
        super()
        this.idPlaylist=new URLSearchParams(window.location.search).get('id')
        this.searchLoop()
        this.buttonClick=this.buttonClick.bind(this)
    }
    getNewInformations(){
        return new Promise(async(resolve)=>{
            this.playlist=await getPlaylist(
                this.idPlaylist,
                {limit:1,offset:this.informations.index}
            )
            
            if(this.informations.items.length!=this.playlist.total){
                const response=await getPlaylistItems(
                    this.idPlaylist,
                    (this.informations.index*50)
                )
                for(let item of response.items){
                    this.informations.items.push(item.track.id)

                    const loading=document.querySelector('.progress-bar')
                    loading.style.width=`${(this.informations.items.length*100)/this.playlist.total}%`
                }
            }else if(!this.pageLoad){
                this.pageLoad=true
                this.setSuggestion()
            }

            const track=new Track(this.playlist.items[0].track)
            await track.build()

            for(let key in this.informations.features){
                this.informations.features[key]+=track.features[key]
            }

            for(let artist of track.artists){
                if(!this.informations.artists.includes(artist)){
                    this.informations.artists.push(artist)
                }
            }
            let trackGenres=await track.getGenre()

            for(let genre of trackGenres){
                if(!this.informations.genres.includes(genre)){
                    this.informations.genres.push(genre)
                }
            }

            this.informations.index++

            if(this.informations.index==this.playlist.total){
                resolve(true)
                return
            }
            resolve(false)
        })
    }
    buttonClick(e){
        const target=e.target
        const buttons=document.querySelectorAll(`[data-id]`)
        let i
        for(i in this.tracks){
            if(this.tracks[i].id===target.dataset.id){
                break
            }
        }

        if(!this.informations.items.includes(target.dataset.id)){
            this.informations.items.push(target.dataset.id)
        }

        target.classList.add('active')

        if(target.classList.contains('add')){
            this.tracks[i].isPush=true
            for(let button of buttons){
                if(
                    button.dataset.id===target.dataset.id&&
                    button.classList.contains('del')&&
                    button.classList.contains('active')
                ){
                    button.classList.remove('active')
                    break
                }
            }
        }else{
            for(let button of buttons){
                this.tracks[i].isPush=false
                if(
                    button.dataset.id===target.dataset.id&&
                    button.classList.contains('add')&&
                    button.classList.contains('active')
                ){
                    button.classList.remove('active')
                    break
                }
            }
        }

        if(this.isAllClicked(buttons)){
            const confirmButton=document.querySelector('.confirm')
            confirmButton.style.opacity=1
        }
    }
    isAllClicked(buttons){
        if(
            (buttons[0].classList.contains('active')||buttons[1].classList.contains('active'))&&
            (buttons[2].classList.contains('active')||buttons[3].classList.contains('active'))&&
            (buttons[4].classList.contains('active')||buttons[5].classList.contains('active'))
        ){
            return true
        }
        return false
    }
    async pushTracks(){
        const uris=[]

        for(let track of this.tracks){
            if(track.isPush){
                uris.push(track.uri)
            }
        }
        console.log(uris);
        if(uris.length>0){
            const response=await addItemsToPlaylist(uris,this.idPlaylist)
            console.log(response)
        }
        this.setSuggestion()
    }
    async searchLoop(){
        const response=await this.getNewInformations()
        if(response){
            return
        }
        setTimeout(() => {
            requestAnimationFrame(()=>{this.searchLoop()})
        }, 400);
    }
    async setSuggestion(){
        if(this.state.isLoad){
            await this.setState({isLoad:false})
        }


        const loading=document.querySelector('.progress-bar')
        loading.style.width='1%'

        const track1=await this.getNewTrack()
        loading.style.width='33%'
        const track2=await this.getNewTrack([track1.id])
        loading.style.width='66%'
        const track3=await this.getNewTrack([track1.id,track2.id])
        loading.style.width='100%'
        console.log(track3);

        this.tracks=[track1,track2,track3]
        this.setState({isLoad:true})
    }
    getNewTrack(prevTracks=null){
        return new Promise(async(resolve)=>{
            const seeds=this.getSeeds()

            const features=this.informations.features
            const index=this.informations.index

            const seed_artists=seeds.seed_artists
            const seed_genres=seeds.seed_genres
            const seed_tracks=seeds.seed_tracks

            const interval=setInterval(async() => {
                const tracks=await getRecommandations({
                    limit:100,
                    seed_tracks,
                    target_acousticness:features.acousticness/index,
                    target_danceability:features.danceability/index,
                    target_energy:features.energy/index,
                    target_instrumentalness:features.instrumentalness/index,
                    target_liveness:features.liveness/index,
                    target_loudness:features.loudness/index,
                    target_speechiness:features.speechiness/index
                })
                for(let track of tracks.tracks){
                    if(!this.informations.items.includes(track.id)){
                        if(prevTracks){
                            if(!prevTracks.includes(track.id)){
                                clearInterval(interval)
                                resolve(new Track(track))
                                return
                            }
                        }else{
                            clearInterval(interval)
                            resolve(new Track(track))
                            return
                        }
                        
                    }
                }
            }, 400);
        })
    }
    getSeeds(){
        let seed_artists='',
            seed_genres='',
            seed_tracks=''

        let limit=(this.informations.artists.length>=5)?5:this.informations.artists.length
        
        for(let i=0;i<limit;i++){
            let pick=Math.floor(Math.random()*this.informations.artists.length)
            seed_artists+=`${this.informations.artists[pick]},`

            pick=Math.floor(Math.random()*this.informations.genres.length)
            seed_genres+=`${this.informations.genres[pick]},`

            pick=Math.floor(Math.random()*this.informations.items.length)
            seed_tracks+=`${this.informations.items[pick]},`
        }

        seed_artists=seed_artists.slice(0,-1)
        seed_genres=seed_genres.slice(0,-1)
        seed_tracks=seed_tracks.slice(0,-1)

        return {seed_artists,seed_genres,seed_tracks}
    }
    render(){
        if(this.state.isLoad){
            return(
                <div className='trackList'>
                    <Card idTrack={this.tracks[0].id} callback={this.buttonClick}/>
                    <Card idTrack={this.tracks[1].id} callback={this.buttonClick}/>
                    <Card idTrack={this.tracks[2].id} callback={this.buttonClick}/>
                    <button className='confirm'
                        onClick={()=>{this.pushTracks()}}
                    >Confirm</button>
                </div>
            )
        }
        return (
            <div className='Loading'>
                <div className='container'>
                    <div className='progress-bar'></div>
                </div>
            </div>
        )
    }
}