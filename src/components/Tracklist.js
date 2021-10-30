import React from "react"
import { Track } from "../class/Track"
import { addItemsToPlaylist } from "../functions/addElements"
import { getPlaylistItems, getRecommandations, getTrackFeatures } from "../functions/GetElements"
import { randomPickInArray } from "../functions/Utility"
import { Card } from "./Card"
import Loading from "./Loading"

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
    unlikeItems
    constructor(){
        super()
        this.idPlaylist=new URLSearchParams(window.location.search).get('id')
        this.buttonClick=this.buttonClick.bind(this)
        this.unlikeItems=(localStorage.getItem(this.idPlaylist))?JSON.parse(localStorage.getItem(this.idPlaylist)):[]
        console.log(this.unlikeItems);
    }
    async _init(){
        return new Promise(async(resolve)=>{
            let i=0
            const interval=setInterval(async() => {
                const response=await getPlaylistItems(
                    this.idPlaylist,
                    (i*50)
                )
                this.playlist=response
                for(let item of response.items){
                    this.informations.items.push(item.track.id)

                    const loading=document.querySelector('.progress-bar')
                    loading.style.width=`${(this.informations.items.length*100)/this.playlist.total}%`
                }
                i++
                if(this.informations.items.length===response.total){
                    clearInterval(interval)
                    resolve('finish')
                }
            }, 300);
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
                this.informations.items.push(track.id)
                uris.push(track.uri)
            }else{
                this.unlikeItems.push(track.id)
                localStorage.setItem(
                    this.idPlaylist,
                    JSON.stringify(this.unlikeItems)
                )              
            }
        }
        console.log(uris);
        if(uris.length>0){
            const response=await addItemsToPlaylist(uris,this.idPlaylist)
        }
        this.setSuggestion()
    }
    getRandomFeatures(features){
        let selectedFeatures=randomPickInArray(features.audio_features,5)

        this.informations.features={
            acousticness:0,
            danceability:0,
            energy:0,
            instrumentalness:0,
            liveness:0,
            loudness:0,
            speechiness:0,
            tempo:0
        }
        let selectedTracks=[]

        for(let feature of selectedFeatures){
            selectedTracks.push(feature.id)
            for(let key in feature){
                if(this.informations.features[key]!=undefined){
                    this.informations.features[key]+=feature[key]
                }
            }
        }
        return selectedTracks.toString()
    }
    async setSuggestion(){
        if(this.state.isLoad){
            await this.setState({isLoad:false})
        }

        let selectedItems=randomPickInArray(this.informations.items,100)

        const features=await getTrackFeatures({ids:selectedItems.toString()})



        const loading=document.querySelector('.progress-bar')
        loading.style.width='1%'

        const track1=await this.getNewTrack(this.getRandomFeatures(features))
        loading.style.width='33%'
        const track2=await this.getNewTrack(this.getRandomFeatures(features),[track1.id])
        loading.style.width='66%'
        const track3=await this.getNewTrack(this.getRandomFeatures(features),[track1.id,track2.id])
        loading.style.width='100%'

        this.tracks=[track1,track2,track3]
        this.setState({isLoad:true})
    }
    animation(){
        const animDiv=document.querySelectorAll('.animDiv')
        const coverAlbum=document.querySelectorAll('.coverAlbum')
        console.log(animDiv);
        let i=0
        const interval=setInterval(() => {
            if(i===3){
                clearInterval(interval)
                animDiv[i*3-1].classList.remove('animDivHover')
                animDiv[i*3-2].classList.remove('animDivHover')
                animDiv[i*3-3].classList.remove('animDivHover')
                coverAlbum[i-1].classList.remove('coverAlbumHover')
                return
            }

            animDiv[i*3].classList.add('animDivHover')
            animDiv[i*3+1].classList.add('animDivHover')
            animDiv[i*3+2].classList.add('animDivHover')


            coverAlbum[i].classList.add('coverAlbumHover')

            if(i>0){
                animDiv[i*3-1].classList.remove('animDivHover')
                animDiv[i*3-2].classList.remove('animDivHover')
                animDiv[i*3-3].classList.remove('animDivHover')
                coverAlbum[i-1].classList.remove('coverAlbumHover')
            }

            i++
        }, 2000);
    }
    getNewTrack(seed_tracks,prevTracks=null){
        return new Promise(async(resolve)=>{
            const features=this.informations.features

            const interval=setInterval(async() => {
                const tracks=await getRecommandations({
                    limit:100,
                    seed_tracks,
                    target_acousticness:features.acousticness/5,
                    target_danceability:features.danceability/5,
                    target_energy:features.energy/5,
                    target_instrumentalness:features.instrumentalness/5,
                    target_liveness:features.liveness/5,
                    target_loudness:features.loudness/5,
                    target_speechiness:features.speechiness/5
                })
                let track
                let isNew=false
                for(track of tracks.tracks){
                    if(!this.informations.items.includes(track.id)){
                        if(prevTracks){
                            if(prevTracks.includes(track.id)){
                                continue
                            }
                        }
                        if(!this.unlikeItems.includes(track.id)){
                            isNew=true
                            break
                        }
                    }
                }
                if(isNew){
                    clearInterval(interval)
                    resolve(new Track(track))
                    return
                }
            }, 400);
        })
    }
    async componentDidMount(){
        await this._init()
        this.setSuggestion()
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
            <Loading/>
        )
    }
}