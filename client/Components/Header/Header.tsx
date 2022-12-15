import React, { useState } from 'react';

const Header: React.FC = () => {
    const [numCounter, setNumCounter] = useState<number>(0);

    return (
        <div>
            <h3>Header Component</h3>
            <h2>{numCounter}</h2>
            <button onClick={()=> {setNumCounter(numCounter + 1)}}>Count up</button>
            <button onClick={()=> {setNumCounter(numCounter - 1)}}>Count down</button>
        </div>
    )
}

export default Header;