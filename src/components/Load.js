import { motion } from 'framer-motion';
import React from 'react';

const Load = () => {
    return (
        <div className='load'>
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
        </div>
    );
};

export default Load;