import { motion } from 'framer-motion';
import React from 'react';
import { Card } from '../components/Card';
import Load from '../components/Load';
import { AccessToken } from '../functions/Auth';

const Home = () => {
    const clickButton=(e)=>{
        e.target.style.opacity=0;
        setTimeout(() => {
            e.target.style.display='none'
        }, 1000);
    }

    return (
        <main id='Home'>
            <div className='searchButton'>
                <div id='first'></div>
                <div id='second'></div>
                <div id='last'></div>
                <motion.a
                    href={`/playlist#access_token=${AccessToken}`}
                    onClick={clickButton}
                    animate={{opacity:1}}
                    transition={{
                        duration:1
                    }}
                >Find Songs</motion.a>
            </div>
        </main>
    );
};

export default Home;