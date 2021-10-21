import { motion } from "framer-motion"
import React, { useState } from "react"
import { Track } from "../class/Track"
import { getTrack } from "../functions/GetElements"

export class Card extends React.Component{
    state={
        track:null
    }
    constructor(props){
        super(props)
    }
    async componentDidMount(){
        const track=await getTrack(this.props.idTrack)
        console.log(this.state);
        this.setState({track:new Track(track)})
        console.log(this.state);
    }
    render(){
        if(this.state.track instanceof Track){
            return(
                <motion.div
                    className='CardAlbum'
                    layout
                    //onClick={toggleOpen}
                    initial={{borderRadius:10}}
                >
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