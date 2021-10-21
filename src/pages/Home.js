import { motion } from 'framer-motion';
import React from 'react';
import { Track } from '../class/Track';
import { Card, CardTrack } from '../components/Card';
import { getTrack } from '../functions/GetElements';

const Home = () => {
    const clickButton=(e)=>{
        e.target.style.opacity=0;
        afterClick()
        setTimeout(() => {
            e.target.style.display='none'
        }, 1000);
    }
    const afterClick=async()=>{
        const home=document.getElementById('Home')
        const trackList=document.querySelector('.trackList')

        home.style.backgroundColor='#145A32'
        trackList.style.opacity=1
        trackList.style.display='flex'

        const track=await getTrack('1MF6t2YiYGhyPxsN5DNbjB')
        const card=new Card(new Track(track))
        card.render()
    }
    return (
        <main id='Home'>
            <div className='trackList'>
                <Card idTrack='4UP8KDfTIQUOXVjtg9h9ia'/>
            </div>
            <div className='searchButton'>
                <div id='first'></div>
                <div id='second'></div>
                <div id='last'></div>
                <motion.button
                    onClick={clickButton}
                    animate={{opacity:1}}
                    transition={{
                        duration:1
                    }}
                >Find Songs</motion.button>
            </div>
        </main>
    );
};

export default Home;