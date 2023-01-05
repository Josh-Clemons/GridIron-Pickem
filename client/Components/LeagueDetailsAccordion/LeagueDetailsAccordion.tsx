import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { LeagueDetail, LeagueUsers, Store } from '../../../src/interfaces/interfaces';

import ModalRenameLeague from '../ModalRenameLeague/ModalRenameLeague';
import ModalDeleteLeague from '../ModalDeleteLeague/ModalDeleteLeague';
import ModalLeaveLeague from '../ModalLeaveLeague/ModalLeaveLeague';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack } from '@mui/material';






const LeagueDetailsAccordion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id }: any = useParams();
    const store: Store = useSelector(store => store) as Store;
    const leagueDetail: LeagueDetail[] = store.leagues.leagueDetail;
    const leagueUsers: LeagueUsers[] = store.leagues.currentLeagueUsers;
    const commissioner: any = leagueUsers.filter(e => e.id === leagueDetail[0]?.owner_id);

    // tracks member details so correct button and component options appear
    const [isMember, setIsMember] = React.useState<boolean>(false);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    useEffect(() => {
        setMember();
    }, [leagueDetail]);


    const setMember = () => {
        if (leagueDetail.filter(e => e.owner_id === store.user.id).length > 0) {
            setIsMember(false);
            setIsAdmin(true);
        } else if (leagueUsers.filter(e => e.id === store.user.id).length > 0) {
            setIsMember(true);
            setIsAdmin(false);
        } else {
            setIsAdmin(false);
            setIsMember(false);
        };

    };


    return (
        <Accordion sx={{
            width: '100%'
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="leagueDetailsAccordion"
            >
                <Typography>League Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    Commissioner: {commissioner[0]?.username}
                    <br />
                    Members: {leagueUsers.length} / 100
                    <br />
                    Access Code: wasdfhoia
                    <br />
                    {isAdmin ? <Stack direction='row'><ModalDeleteLeague /> <ModalRenameLeague /></Stack> : null}
                    {isMember ? <ModalLeaveLeague /> : null}
                    <br />
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default LeagueDetailsAccordion;