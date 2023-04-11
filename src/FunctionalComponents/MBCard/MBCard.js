import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MBCard = (props) => {
    return (
        <>
            <Card className={props.className} >
                <CardHeader title={props.title} />
                <CardContent>
                    {props.content}
                </CardContent>
                <CardActions>
                    {props.actions}
                </CardActions>
            </Card>
        </>

    )
}
export default MBCard
