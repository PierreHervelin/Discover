import { motion } from "framer-motion"
import React from "react"
import { Track } from "../class/Track"
import { getTrack } from "../functions/GetElements"
import ColorThief from "colorthief"

export class Card extends React.Component{
    state={
        track:null,
        palette:null,
        color:null
    }
    constructor(props){
        super(props)


    }
    async componentDidMount(){
        const track=await getTrack(this.props.idTrack)
        this.setState({track:new Track(track)})

        const colorThief=new ColorThief()
        const img=new Image()

        img.onload=()=>{
            this.setState({
                color:colorThief.getColor(img),
                palette:colorThief.getPalette(img)
            })
        }

        img.crossOrigin='Anonymous';
        img.src=this.state.track.image 
    }
    async componentDidUpdate(prevProps){
        if(prevProps.idTrack!=this.props.idTrack){
            const track=await getTrack(this.props.idTrack)
            this.setState({track:new Track(track)})

            const colorThief=new ColorThief()
            const img=new Image()

            img.onload=()=>{
                this.setState({
                    color:colorThief.getColor(img),
                    palette:colorThief.getPalette(img)
                })
            }

            img.crossOrigin='Anonymous';
            img.src=this.state.track.image

            const buttons=document.querySelectorAll(`[data-id]`)

            for(let button of buttons){
                button.classList.remove('active')
            }
        }
    }
    render(){
        if(this.state.track&&this.state.color){
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
            this.state.track.audio.onended=()=>{
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
                            backgroundColor:`rgb(${this.state.color[0]},${this.state.color[1]},${this.state.color[2]})`
                        }}
                    ></div>
                    <div 
                        className='animDiv'
                        id='second'
                        style={{
                            backgroundColor:`rgb(${this.state.palette[1][0]},${this.state.palette[1][1]},${this.state.palette[1][2]})`
                        }}
                    ></div>
                    <div 
                        className='animDiv'
                        id='last'
                        style={{
                            backgroundColor:`rgb(${this.state.palette[3][0]},${this.state.palette[3][1]},${this.state.palette[3][2]})`
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
                                />
                                <button
                                    id={`play--${this.state.track.id}`}
                                    className='icon-play' 
                                    onClick={play}
                                    data-state='pause'
                                />
                                <button    
                                    onClick={this.props.callback}
                                    data-id={this.state.track.id}
                                    className='del icon-cross'
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