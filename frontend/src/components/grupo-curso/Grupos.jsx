import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";

import GroupMember from "./group-members/GroupMember"
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import CurseGroup from './CurseGroup';
import { fetchGrupos, mostrarGrupos } from "./groupDucks";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Grupos(props){
    const dispatch = useDispatch();

    const {idCurso} = props
    const {needsBack} = props;

    useEffect(() => {
        dispatch(fetchGrupos(idCurso));
        // hacer aquí la llamada para fetching de grupos
    }, [dispatch]);

    const classes = useStyles();
    const selectedGroup = useSelector(store => store.groups.selectedGroup);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={selectedGroup.name?6:12}>
                    <Card className={classes.card}>
                        <CardHeader 
                        title={"Grupos Activos"}
                        action={
                            !needsBack
                            ?<div/>
                            :<IconButton component={Link} to={'/curso/'+idCurso+'/home'} >
                                <ArrowBackIcon />
                            </IconButton>
                        }
                        />
                        <CardContent>
                            <CurseGroup idCurso = {idCurso}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} hidden={selectedGroup.name?false:true}>
                    <Card className={classes.card}> 
                        <CardHeader title={selectedGroup.name?'Miembros de ' + selectedGroup.name:''} action={
                            <IconButton onClick={() => dispatch(mostrarGrupos({}))}>
                                <Close />
                            </IconButton>
                        }>
                        </CardHeader>
                        <CardContent>
                            {
                                selectedGroup==={}
                                    ?<div></div>
                                    :<GroupMember groupID={selectedGroup.id} idCurso = {selectedGroup.id} group = {selectedGroup}/>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}
