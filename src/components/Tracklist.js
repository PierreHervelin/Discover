import React from "react"
import { Card } from "./Card"

export class Tracklist extends React.Component{
    state={
        tracks:null
    }
    constructor(){
        super()
    }
    async componentDidMount(){
        this.setState({
            tracks:[
                '6fIjnWrv46njJHLDAY2JdC',
                '0jNFDcGAXPs5ahngmD5R6n',
                '2hsA5cjObzo1kDTJfJ1HlG'
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