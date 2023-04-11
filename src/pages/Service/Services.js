// import  React from 'react';
// import MBForm from '../../FunctionalComponents/MBForm/MBForm'
// import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
// import { TextField, Grid, Typography } from '@mui/material'
// import { Stack } from '@mui/material'
// import { styled } from '@mui/material/styles'
// import Paper from '@mui/material/Paper'
// import { useFileUpload } from 'use-file-upload'
// import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
// import Button from '@mui/material/Button'
// import { AlertTypes, ReducerTypes,Basic } from '../../Assets/Constants'
// import Store from '../../Store'
// import { Box } from '@mui/system'
// import Axios from '../../Services/API'
// import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// const Services=()=>{
//     return(
//         <>
//         <h1>Services</h1>
//         <Paper elevation={16}>
//         <ContentStyle>
//           <Box mt={2} className='bottom-login'>
//             <Box sx={{ marginLeft: 'auto' }}>
//               {/* <MBFormButton variant='outlined' onClick={openForm}>
//                           Add WhyChooseUs
//                         </MBFormButton> */}
//               {!banner ? (
//                 <MBFormButton variant='outlined' onClick={openForm}>
//                   {' '}
//                   Add Content
//                 </MBFormButton>
//               ) : (
//                 <MBFormButton
//                   variant='outlined'
//                   onClick={() => handleClick({ banner })}
//                 >
//                   Update Content
//                 </MBFormButton>
//               )}
//             </Box>
//           </Box>
//           {formstatus ? (
//             <MBForm onSubmit={uploadImg}>
//               <Stack spacing={3}>
//                 <MBTextField
//                   fullWidth
//                   id={'heading'}
//                   name={'heading'}
//                   value={heading}
//                   key={'heading'}
//                   label={'Heading'}
//                   required={true}
//                   error
//                   validate={valid}
//                   onChange={e => {
//                     setHeading(e.target.value)
//                   }}
//                 />
//                 <Grid container spacing={3} style={{ margin: '7px -24px' }}>
//                   <Grid item xs={12} sm={6} md={6}>
//                     <Typography
//                       variant='body1'
//                       sx={{ color: 'text.secondary' }}
//                       noWrap
//                     >
//                       Upload Banner Picture
//                     </Typography>
//                     <div className='img-container'>
//                       <img src={files ? files.source : img} alt='preview' />
//                       <div class="overlay">
//                       <CloudUploadOutlinedIcon
//                         onClick={() =>
//                           selectFiles(
//                             { accept: 'image/*' },
//                             ({ name, size, source, file }) => {
//                               //   let setdata = {name, size, source, file}
//                               //   setProfile(setdata);
//                             }
//                           )
//                         }
//                       />
//                       </div>
                      
//                     </div>
//                   </Grid>
//                 </Grid>
//                 <Stack
//                   direction='row'
//                   alignItems='right'
//                   justifyContent='right'
//                   sx={{ my: 2 }}
//                 >
//                   <MBFormButton
//                     variant='contained'
//                     fullWidth={false}
//                     color='error'
//                     style={{ marginRight: '5px' }}
//                     onClick={cancelForm}
//                     type={'button'}
//                   >
//                     Cancel
//                   </MBFormButton>
//                   {rowdata ? (
//                     <MBFormButton
//                       onClick={() => {
//                         setValid(true)
//                       }}
//                       type={'submit'}
//                       variant='contained'
//                       fullWidth={false}
//                     >
//                       Update
//                     </MBFormButton>
//                   ) : (
//                     <MBFormButton
//                       onClick={() => {
//                         setValid(true)
//                       }}
//                       type={'submit'}
//                       variant='contained'
//                       fullWidth={false}
//                     >
//                       Submit
//                     </MBFormButton>
//                   )}
//                 </Stack>
//               </Stack>
//             </MBForm>
//           ) : (
//             <>
//               <h5 className='w-h5'>{banner.heading}</h5>
//               <img className='h-img' src={img} alt='icons' />
            
//             </>
//           )}
//         </ContentStyle>
//       </Paper>
//         </>
//     );
// }
// export default Services; 
