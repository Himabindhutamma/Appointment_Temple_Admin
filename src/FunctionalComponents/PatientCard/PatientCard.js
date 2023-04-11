import React from 'react'
import {Grid} from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import patient from '../Table/patient.jpg'

const PatientCard = ({patientList}) => {
  return (
    <>
      <Grid container spacing={2}>
          {patientList && patientList.map((i,j)=>
            <Grid item xs={12} sm={2} md={2}>
            <Card>
              <CardContent >
                  <div className='pa-ccontent'>
                  <img src={patient} alt="p1"/>
                    <div>
                        <h3>{i.name}</h3>
                    </div>
                  <div>
                      <h5>Patient ID:{i.id}</h5>
                      <h5> <i class="fas fa-map-marker-alt"/>{i.location}</h5>
                  </div>
                  </div>
                   
                <div className='pa-info'>
                  <ul>
                      <li>Phone <span>{i.phone}</span></li>
                      <li>Age <span>{i.age}</span></li>
                      <li>Blood Group <span>{i.bloodgroup}</span></li>
                  </ul>
                </div>
              </CardContent>
              
            </Card>
          </Grid>
          )}
        
      </Grid>
    </>
  )
}
export default PatientCard
