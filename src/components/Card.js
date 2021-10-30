import { motion } from "framer-motion"
import React from "react"
import { Track } from "../class/Track"
import { getTrack } from "../functions/GetElements"
import ColorThief from "colorthief"
import { Extract } from "../pages/Suggestion"

export class Card extends React.Component{
    state={
        track:null
    }
    palette
    color
    constructor(props){
        super(props)


    }
    async componentDidMount(){
        const track=await getTrack(this.props.idTrack)
        
        await this.loadImage(track.album.images[0].url)

        this.setState({track:new Track(track)})
    }
    async componentDidUpdate(prevProps){
        if(prevProps.idTrack!=this.props.idTrack){
            const track=await getTrack(this.props.idTrack)

            await this.loadImage(track.album.images[0].url)

            const buttons=document.querySelectorAll(`[data-id]`)

            for(let button of buttons){
                button.classList.remove('active')
            }

            this.setState({track:new Track(track)})
        }
    }
    loadImage(url){
        return new Promise((resolve)=>{
            const img=new Image()
            const colorThief=new ColorThief()

            img.crossOrigin='Anonymous'
            img.src=url 

            img.onload=()=>{
                this.color=colorThief.getColor(img)
                this.palette=colorThief.getPalette(img)
                resolve('loaded')
            }
        })
    }
    render(){
        if(this.state.track){
            const play=(e)=>{
                if(e.target.dataset.state==='play'){
                    e.target.classList.remove('icon-pause')
                    e.target.classList.add('icon-play')
                    e.target.dataset.state='pause'
                    this.state.track.audio.pause()
                }else{
                    e.target.classList.remove('icon-play')
                    e.target.classList.add('icon-pause')
                    e.target.dataset.state='play'
                    this.state.track.audio.play()
                }
            }
            const togglePlay=(e)=>{
                const buttons=document.querySelectorAll('.play-button')
                if(e.target.dataset.state==='play'){
                    e.target.classList.remove('icon-play')
                    e.target.classList.add('icon-pause')
                    e.target.dataset.state='pause'

                    for(let button of buttons){
                        if(button.isEqualNode(e.target)) continue

                        if(button.dataset.state==='pause'){
                            button.classList.remove('icon-pause')
                            button.classList.add('icon-play')
                            button.dataset.state='play'
                        }
                    }

                    Extract.src=this.state.track.audio
                    Extract.play()
                }else{
                    e.target.classList.remove('icon-pause')
                    e.target.classList.add('icon-play')
                    e.target.dataset.state='play'
                    Extract.pause()
                }
            }
            Extract.onended=()=>{
                const button=document.querySelector(`#play--${this.state.track.id}`)
                button.classList.remove('icon-pause')
                button.classList.add('icon-play')
                button.dataset.state='pause'
            }

            const children=[]

            for(let artist of this.state.track.artistsName){
                children.push(
                    <h4 key={artist}>{artist}</h4>
                )
            }

            return(
                <motion.div
                    className='CardAlbum'
                    layout
                    //onClick={toggleOpen}
                >
                    <div 
                        className='animDiv'
                        id='first'
                        style={{
                            backgroundColor:`rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
                        }}
                    ></div>
                    <div 
                        className='animDiv'
                        id='second'
                        style={{
                            backgroundColor:`rgb(${this.palette[1][0]},${this.palette[1][1]},${this.palette[1][2]})`
                        }}
                    ></div>
                    <div 
                        className='animDiv'
                        id='last'
                        style={{
                            backgroundColor:`rgb(${this.palette[3][0]},${this.palette[3][1]},${this.palette[3][2]})`
                        }}
                    ></div>
                    <motion.div 
                        className='coverAlbum' 
                        layout
                        style={{
                            backgroundImage:`url(${this.state.track.image})`
                        }}
                    >
                        <div className='container'>
                            <h3>{this.state.track.title}</h3>
                            <div className='artist'>{children}</div>
                            <div className='buttons'>
                                <button 
                                    onClick={this.props.callback}
                                    data-id={this.state.track.id}
                                    className='add icon-plus'
                                    title='add to playlist'
                                />
                                <button
                                    id={`play--${this.state.track.id}`}
                                    data-url={this.state.track.audio}
                                    className='play-button icon-play'
                                    onClick={togglePlay}
                                    data-state='play'
                                />
                                <button    
                                    onClick={this.props.callback}
                                    data-id={this.state.track.id}
                                    className='del icon-cross'
                                    title="don't add to playlist"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )
        }else{
            return (
                <div>
                </div>
            )
        }
    }
}