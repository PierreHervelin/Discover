import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Load from '../components/Load';
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
            <h2>You have to listen to these songs,</h2>
            <Tracklist/>
            <Load/>
        </main>
    );
};

export default Suggestion;