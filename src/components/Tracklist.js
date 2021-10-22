import React from "react"
import { getSeedArtists } from "../functions/Analysis"
import { getRecentSongs } from "../functions/GetElements"
import { Card } from "./Card"

export class Tracklist extends React.Component{
    state={
        tracks:null
    }
    constructor(){
        super()
    }
    async componentDidMount(){
        const params={
            limit:50
        }
        const response=await getRecentSongs(params)
        getSeedArtists(response.items)

        this.setState({
            tracks:[
                '0ocyx5iy9mdokYxTGNXkM3',
                '0jNFDcGAXPs5ahngmD5R6n',
                '1E9FZeR3CZCgqpjaHZxlPg'
            ]
        })
    }
    render(){
        if(this.state.tracks){
            return(
                <div className='trackList'>
                    <Card idTrack={this.state.tracks[0]}/>
                    <Card idTrack={this.state.tracks[1]}/>
                    <Card idTrack={this.state.tracks[2]}/>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}