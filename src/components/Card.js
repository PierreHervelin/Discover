import { motion } from "framer-motion"
import React, { useState } from "react"
import { Track } from "../class/Track"
import { getTrack } from "../functions/GetElements"
import ColorThief from "colorthief"

export class Card extends React.Component{
    state={
        track:null,
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
                color:colorThief.getColor(img)
            })
        }

        img.crossOrigin='Anonymous';
        img.src=this.state.track.image 
    }
    render(){
        if(this.state.track&&this.state.color){
            return(
                <motion.div
                    className='CardAlbum'
                    layout
                    //onClick={toggleOpen}
                    initial={{borderRadius:10}}
                >
                    <div 
                        className='animDiv'
                        style={{
                            backgroundColor:`rgb(${this.state.color[0]},${this.state.color[1]},${this.state.color[2]})`
                        }}
                    ></div>
                    <motion.div 
                        className='coverAlbum' 
                        layout
                        style={{
                            backgroundImage:`url(${this.state.track.image})`
                        }}
                    >
                        <div>
                            <h3>{this.state.track.title}</h3>
                        </div>
                    </motion.div>
                </motion.div>
            )
        }else{
            return (
                <div>
                    wait..
                </div>
            )
        }
    }
}