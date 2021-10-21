import { motion } from 'framer-motion';
import React from 'react';
import { Card } from '../components/Card';

const Home = () => {
    const clickButton=(e)=>{
        e.target.style.opacity=0;
        afterClick()
        setTimeout(() => {
            e.target.style.display='none'
        }, 1000);
    }
    const afterClick=()=>{
        const home=document.getElementById('Home')
        const trackList=document.querySelector('.trackList')

        home.style.backgroundColor='#1DB954'
        trackList.style.opacity=1

        let i=0
        const children=trackList.children
        let interval=setInterval(() => {
            if(i>=children.length){
                clearInterval(interval)
                return
            }
            children[i].style.opacity=1
            i++
        }, 2000);
    }

    return (
        <main id='Home'>
            <div className='trackList'>
                <Card idTrack='4UP8KDfTIQUOXVjtg9h9ia'/>
                <Card idTrack='3fHFpZGEnzkocwC1xKSoNY'/>
                <Card idTrack='4d6z0mKVcnhE5x0YWvTexh'/>
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