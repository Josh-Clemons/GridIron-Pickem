import React, { useState } from 'react';
import axios from 'axios';

const Header: React.FC = () => {
    const [numCounter, setNumCounter] = useState<number>(0);
    
    // const handleClick = () => {
    //     console.log('in handleclick');
    //     const response:any = axios.get('/users');
    // };

    async function handleClick() {
        console.log('in handle click');
        try {
            let users = await axios.get('/users');
            console.log('users in handle click get: ', users.data);
        }catch(error) {
            console.log('error in handleclick')
        }
    }


    return (
        <div>
            <h3>Header Component</h3>
            <h2>{numCounter}</h2>
            <button onClick={()=> {setNumCounter(numCounter + 1)}}>Count up</button>
            <button onClick={()=> {setNumCounter(numCounter - 1)}}>Count down</button>
            <button onClick={handleClick}>Server Get</button>
        </div>
    )
}

export default Header;


