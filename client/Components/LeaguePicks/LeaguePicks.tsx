import React from 'react';
import { useSelector } from 'react-redux';

const LeaguePicks = () => {

    const store: any = useSelector(store => store)
    const userPicks = store.leagues.leagueDetail.filter(e => e.username === store.user.username)




    return (
        <div>League Picks</div>
    )
}

export default LeaguePicks;