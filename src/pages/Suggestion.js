import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Tracklist } from '../components/Tracklist';

const Suggestion = () => {
    useEffect(() => {
        setTimeout(() => {
            const intro=document.querySelectorAll('.intro')
            for(let  i of intro){
                i.remove()
            }
        },3200)
    })
    return (
        <main id='Suggestion'>
            <h2>You have to listen these songs,</h2>
            <Tracklist/>
            <motion.div
                className='intro'
                id='first'
                animate={{
                    transform:['translate(0,0%)','translate(0,100%)']
                }}
                transition={{
                    duration:2,
                    ease:[0,0.2,0.4,1],
                    delay:1.2
                }}
            />
            <motion.div
                className='intro'
                id='second'
                animate={{
                    transform:['translate(0,0%)','translate(0,100%)']
                }}
                transition={{
                    duration:2,
                    ease:[0,0.2,0.4,1],
                    delay:1.1
                }}
            />
            <motion.div
                className='intro'
                id='last'
                animate={{
                    transform:['translate(0,0%)','translate(0,100%)']
                }}
                transition={{
                    duration:2,
                    ease:[0,0.2,0.4,1],
                    delay:1
                }}
            />
        </main>
    );
};

export default Suggestion;