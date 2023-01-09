import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { LeagueDetail, LeagueUsers, Store, User, UserLeagues } from '../../../src/interfaces/interfaces';

import ModalRenameLeague from '../ModalRenameLeague/ModalRenameLeague';
import ModalDeleteLeague from '../ModalDeleteLeague/ModalDeleteLeague';
import ModalLeaveLeague from '../ModalLeaveLeague/ModalLeaveLeague';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, ClickAwayListener, Stack, Tooltip } from '@mui/material';
import ModalRules from '../ModalRules/ModalRules';





const LeagueDetailsAccordion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id }: any = useParams();
    const store: Store = useSelector(store => store) as Store;
    const leagueDetail: LeagueDetail[] = store.leagues.leagueDetail;
    const leagueUsers: LeagueUsers[] = store.leagues.currentLeagueUsers;
    const userLeagues: UserLeagues[] = store.leagues.userLeagues;
    const thisLeague: UserLeagues[] = userLeagues.filter(e => e.id == id)
    const commissioner: User[] = leagueUsers.filter(e => e.id === leagueDetail[0]?.owner_id);

    // tracks member details so correct button and component options appear
    const [isMember, setIsMember] = React.useState<boolean>(false);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    const [openCopied, setOpenCopied] = React.useState<boolean>(false);

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

    // anyone can join
    const joinLeague = () => {
        dispatch({ type: 'CREATE_PICKS', payload: id });
        navigate('/dashboard');
    }

    const handleTooltipClose = () => {
        setOpenCopied(false);
    };

    const handleTooltipOpen = () => {
        setOpenCopied(true);
        navigator.clipboard.writeText(leagueDetail[0]?.invite_code);
    };

    return (
        <Accordion disableGutters={true} sx={{
            width: '100%'
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="leagueDetailsAccordion"
            >
                <Typography sx={{ fontSize: 18 }}>League Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction={'row'}>
                    <ModalRules variant={'outlined'} size={'small'} width={125} margin={8} />
                    {!isMember && !isAdmin ? <Button variant="outlined" color='success' onClick={joinLeague} size='small' sx={{ width: 125, m: 1, borderWidth: 2 }}>Join<AddIcon sx={{ ml: 2 }} /></Button> : null}
                    {isMember ? <ModalLeaveLeague /> : null}
                </Stack>
                <Box>
                    <Typography variant={'body1'} sx={{ fontSize: 18, mt: 2, mb: 1 }}>Commissioner: {commissioner[0]?.username}</Typography>
                    <Typography variant={'body1'} sx={{ fontSize: 18, mb: 1 }}>Members: {thisLeague[0]?.user_count} / {thisLeague[0]?.max_users}</Typography>
                    <Typography variant={'body1'} sx={{ fontSize: 18, mb: 1 }}>Availability: {thisLeague[0]?.is_private ? "Private" : "Public"} </Typography>
                    {isMember || isAdmin
                        ?
                        <Box>
                            {/* tooltip and listener for the copying the invite code */}
                            <ClickAwayListener onClickAway={handleTooltipClose}>
                                <div>
                                    <Tooltip
                                        PopperProps={{
                                            disablePortal: true,
                                        }}
                                        onClose={handleTooltipClose}
                                        open={openCopied}
                                        disableFocusListener
                                        disableHoverListener
                                        leaveTouchDelay={1000}
                                        leaveDelay={1000}
                                        title="Copied!"
                                        sx={{
                                            color: 'red'
                                        }}
                                    >
                                        <Typography variant={'body1'} onClick={handleTooltipOpen} sx={{ fontSize: 18, mb: 3 }}>Invite Code: {leagueDetail[0]?.invite_code} <ContentCopyIcon sx={{ ml: 1, '&:hover': { cursor: 'pointer' } }} /></Typography>
                                    </Tooltip>
                                </div>
                            </ClickAwayListener>
                        </Box> : null
                    }
                    {isAdmin ? <Stack direction='row'><ModalDeleteLeague /> <ModalRenameLeague /></Stack> : null}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default LeagueDetailsAccordion;