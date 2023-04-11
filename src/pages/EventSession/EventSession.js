import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container,Typography,Button } from '@mui/material';
import EventSessionList from './EventSessionList';
import EventSessionForm from './EventSessionForm';
import BookingDataList from './BookingDataList';
import ParticipantList from './ParticipantList';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const EventSession = ({ role }) => {

  const [pageState, setPageState] = useState('VIEW');
  const [eventsessionId, setEventSessionId] = useState('');
  const [bookingId, setBookingId]= useState('')

 

  useEffect(() => {
    console.log(pageState)
  }, [pageState])

  const onSubmit = () => {
    setPageState('VIEW');
  }

  const onCancel = () => {
    setPageState('VIEW');
  }

  const onEdit = () => {
    setPageState('UPDATE');
  }
  const onClick = (e) => {
    console.log(e);
    if(e.action === 'View'){
      setPageState('EVENTVIEW')
      setEventSessionId(e.item.eventSessionId_eventSessions)
    }else if(e.action === "Paricipant View"){
      setPageState('PARTICIPANTVIEW')
      setBookingId(e.item.eventBookingId_eventBookings)
      }else{
      setPageState('ADD');
    }
    
  }

  return (
    <>
      <Page title="Roles">
          {pageState === "ADD" || pageState === "UPDATE" ?
            <>
              <EventSessionForm onSubmit={() => { onSubmit() }} onCancel={() => { onCancel() }} />
            </>

            :
            <>
            { pageState === "EVENTVIEW" ?
              <>
              <ArrowBackIcon className='arr-icon' onClick={() => setPageState('VIEW')}/>
              <BookingDataList item={eventsessionId} onAction={onClick} />
              </>
              
             :
              pageState === "PARTICIPANTVIEW" ? <>
              <ArrowBackIcon className='arr-icon' onClick={() => setPageState('EVENTVIEW')}/>
              <ParticipantList onAction={onClick} bookingid={bookingId} />
              </>
              
               :

             <> 
             <Stack direction="row" alignItems="right" justifyContent="right">
                <Button className='adding-btn'
                  variant="contained"
                  onClick={onClick}
                  startIcon={<Icon icon={plusFill} />}
                >
                  New Slots
                </Button>
              </Stack>
              <EventSessionList onAction={onClick} />
             </>
            }
              
            </>
          }
      </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return { role: state.User.role }
};


export default connect(mapStateToProps)(EventSession);