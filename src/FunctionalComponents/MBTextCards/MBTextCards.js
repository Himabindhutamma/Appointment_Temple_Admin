import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const MBTextCards = ({data, options, close, onClose}) => {

    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 40,
        lineHeight: '30px',
        padding:'5px'

    }));

    return (
        <Grid container spacing={2} style={{position:'relative'}}>
            {data.map((i, j) => {
                if (close) {
                    return (
                        <Grid item>
                            <IconButton aria-label="delete" size="small" style={{
                                right: '22px',
                                position: 'relative',
                                marginTop: '-11px'
                            }} onClick={(e)=>{
                                e.preventDefault();
                                if(onClose){
                                    onClose(i,j);
                                }
                            }}>
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                            <Item key={i[options[0].id]} elevation={2}>
                                {options.map(k => {
                                    return <span style={{margin: "3px"}}>{i[k.id]}</span>
                                })}
                            </Item>
                        </Grid>
                    )
                } else {
                    return (
                        <Grid item >
                            <Item key={i[options[0].id]} elevation={1}>
                                {options.map(k => {
                                    return <span style={{margin: "3px"}}>{i[k.id]}</span>
                                })}
                            </Item>
                        </Grid>
                    )
                }
            })}

        </Grid>
    )

}

export default MBTextCards;
