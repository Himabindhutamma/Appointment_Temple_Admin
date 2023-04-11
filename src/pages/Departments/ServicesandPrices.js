import React, { useState, useEffect } from 'react'
import { useFileUpload } from 'use-file-upload'
import { styled } from '@mui/material/styles'
import { Typography, Box, Grid, Stack } from '@mui/material'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import MBTable from '../../FunctionalComponents/MBTable/MBTable'
import MBTextArea from '../../FunctionalComponents/MBTextArea/MBTextArea'
import axios from 'axios'
import Store from '../../Store'
import { AlertTypes, ReducerTypes,Basic } from '../../Assets/Constants'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { connect } from 'react-redux'
import Paper from '@mui/material/Paper'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Axios from '../../Services/API'
const ContentStyle = styled('div')(({ theme }) => ({
  // maxWidth: 580,
  padding: '25px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
  // padding: theme.spacing(12, 0),
}))

const TABLE_HEAD = [
  { id: 'mainheading', label: 'Main Heading', alignRight: false },
  { id: 'heading', label: 'Heading', alignRight: false },
  { id: 'para', label: 'Content', alignRight: false },
  { id: 'images', label: 'Image', alignRight: false }
]
const actions = [{ icon: "", actionName: Basic.EDIT_ACTION }]
const ServicesandPrices = ({ onSubmit, cid, getData, choose }) => {
  console.log(choose);
  const [open, setOpen] = useState(false)
  const [tariff, setTariff] = useState([])
  const [cvtariff, setCvtariff] = useState([])
  const [cardsList, setCardsList] = useState([])
  const [valid, setValid] = useState(false)
  const [file, selectFile] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [seethediff, setSeethediff] = useState('')
  const [heading1, setHeading1] = useState('')
  const [mainheading, setMainheading] = useState('')
  const [para, setPara] = useState('')
  const [para1, setPara1] = useState('')
  const [para2, setPara2] = useState('')
  const [name, setName] = useState('')
  const [heading2, setHeading2] = useState('')
  const [para3, setPara3] = useState('')
  const [para4, setPara4] = useState('')
  const [rowdata, setRowdata] = useState(null)
  const [formstatus, setFormstatus] = useState(false)
  const [price, setPrice] = useState('')
  const [price1, setPrice1] = useState('')
  const [price2, setPrice2] = useState('')
  const [price3, setPrice3] = useState('')
  const [price4, setPrice4] = useState('')
  const [price5, setPrice5] = useState('')
  console.log(rowdata);
  const onAction = (e) => {
    console.log(e);
    setRowdata(e.item);
    setFormstatus(true);
  }
  useEffect(() => {
    if (rowdata) {
      console.log(rowdata);
      setMainheading(rowdata.mainheading);
      setHeading1(rowdata.heading1);
      setName(rowdata.name);
      setPrice(rowdata.price);
      setPara(rowdata.para);
      setPrice1(rowdata.price1);
      setPara1(rowdata.para1);
      setPrice2(rowdata.price2);
      setPara2(rowdata.para2);
      setPrice3(rowdata.price3);
      setHeading2(rowdata.heading2);
      setPara3(rowdata.para3);
      setPrice4(rowdata.price4);
      setPara4(rowdata.para4);
      setPrice5(rowdata.price5);
    }
  }, [rowdata])
  const openForm = () => {
    setMainheading("");
    setHeading1("");
    setName("");
    setPrice("");
    setPara("");
    setPrice1("");
    setPara1("");
    setPrice2("");
    setPara2("");
    setPrice3("");
    setHeading2("");
    setPara3("");
    setPrice4("");
    setPara4("");
    setPrice5("");
    setFormstatus(true);
  }
  const cancelForm = () => {
    setValid(false);
    setMainheading("");
    setHeading1("");
    setName("");
    setPrice("");
    setPara("");
    setPrice1("");
    setPara1("");
    setPrice2("");
    setPara2("");
    setPrice3("");
    setHeading2("");
    setPara3("");
    setPrice4("");
    setPara4("");
    setPrice5("");
  }
  const handleClick = (value) => {
    console.log(value);
    setFormstatus(true);
    setRowdata(value.choose);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setValid(true);
    e.preventDefault();
    if (rowdata) {
      updateForm();
    } else {
      submitForm();
    }
  }
  // const updateForm = () => {
  //   let data1 = {
  //     "mainheading": mainheading,
  //     "heading1": heading1,
  //     "name": name,
  //     "price":price,
  //     "para": para,
  //     "price1":price1,
  //     "para1": para1,
  //     "price2":price2,
  //     "para2": para2,
  //     "price3":price3,
  //     "heading2": heading2,
  //     "para3": para3,
  //     "price4":price4,
  //     "para4": para4,
  //     "price5":price5
  //   }
  //   let data = {
  //     "staticPageId_staticPages": cid, "name_staticPages": "service", "content_staticPages": JSON.stringify(data1),
  //     "createdDate_staticPages": " ", "updatedDate_staticPages": " "
  //   };
  //   axios.put(`${process.env.REACT_APP_URL}staticpage/updateStaticPage`, data)
  //     .then(res => {
  //       Store.dispatch({
  //         type: ReducerTypes.SHOW_ALERT.toString(),
  //         payload: {
  //           showAlert: true,
  //           message: `Updated Successfully!`,
  //           type: AlertTypes.SUCCESS_ALERT_TYPE
  //         }
  //       });
  //       cancelForm();
  //       getData();
  //       setFormstatus(false);
  //     })
  // }
  // const submitForm = () => {
  //   let data1 = {
  //     "mainheading": mainheading,
  //     "heading1": heading1,
  //     "name": name,
  //     "price":price,
  //     "para": para,
  //     "price1":price1,
  //     "para1": para1,
  //     "price2":price2,
  //     "para2": para2,
  //     "price3":price3,
  //     "heading2": heading2,
  //     "para3": para3,
  //     "price4":price4,
  //     "para4": para4,
  //     "price5":price5
  //   }

  //   //   console.log(cardsList)
  //   //   const handleClickOpen = () => {
  //   //     setOpen(true)
  //   //     setHeading('');
  //   //     setPara('');
  //   //     setPara1('');
  //   //     setPara2('');
  //   //     setName('');

  //   //   }

  //   //   const handleClose = () => {
  //   //     setValid(false)
  //   //     setProfile('');
  //   //     setPara('');
  //   //     setOpen(false);
  //   // }

  //   //   const saveCards = e => {
  //   //     e.preventDefault()

  //   //     console.log(cardsList)
  //   //     let data1 ={
  //   //       "heading":heading,
  //   //       "cardsList":cardsList
  //   //     }  
  //   let data = {
  //     "staticPageId_staticPages": null, "name_staticPages": "service", "content_staticPages": JSON.stringify(data1),
  //     "createdDate_staticPages": " ", "updatedDate_staticPages": " "
  //   };

  //   axios.post(`${process.env.REACT_APP_URL}staticpage/addstaticData`, data).then(res => {
  //     Store.dispatch({
  //       type: ReducerTypes.SHOW_ALERT.toString(),
  //       payload: {
  //         showAlert: true,
  //         message: `Cards added successfully`,
  //         type: AlertTypes.SUCCESS_ALERT_TYPE,
  //         timeOut: 1000
  //       }
  //     })
  //     cancelForm();
  //     setFormstatus(false)
  //   })
  // }
  const updateForm = () => {
    let data1 = {
      mainheading: mainheading,
      heading1: heading1,
      name: name,
      price:price,
      para: para,
      price1:price1,
      para1: para1,
      price2:price2,
      para2: para2,
      price3:price3,
      heading2: heading2,
      para3: para3,
      price4:price4,
      para4: para4,
      price5:price5
    }
    let data2 = {
      staticPageId_staticPages: cid,
      name_staticPages: 'dservice1',
      content_staticPages: JSON.stringify(data1),
      createdDate_staticPages: ' ',
      updatedDate_staticPages: ' '
    }
    Axios.putData('Update_staticPages/', data2).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Updated Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      cancelForm()
      getData()
      setFormstatus(false)
    })
  }
  const submitForm = () => {
    let data1 = {
      mainheading: mainheading,
      heading1: heading1,
      name: name,
      price:price,
      para: para,
      price1:price1,
      para1: para1,
      price2:price2,
      para2: para2,
      price3:price3,
      heading2: heading2,
      para3: para3,
      price4:price4,
      para4: para4,
      price5:price5
    }
    let data = {
      staticPageId_staticPages: null,
      name_staticPages: 'dservice1',
      content_staticPages: JSON.stringify(data1),
      createdDate_staticPages: ' ',
      updatedDate_staticPages: ' '
    }

    Axios.postData('InsertWithParent_staticPages', data).then(res => {
      Store.dispatch({
        type: ReducerTypes.SHOW_ALERT.toString(),
        payload: {
          showAlert: true,
          message: `Banner Added Successfully!`,
          type: AlertTypes.SUCCESS_ALERT_TYPE
        }
      })
      cancelForm()
      getData()
      setFormstatus(false)
    })
  }
 
  return (
    <>

      {/* <Paper elevation={16}>
      <ContentStyle>
        <MBForm onSubmit={saveCards}>
          <Box mt={2} className='bottom-login'>
            <Box sx={{ marginLeft: 'auto' }}>
              <MBFormButton variant='outlined' onClick={handleClickOpen}>
                Add Card
              </MBFormButton>
            </Box>
          </Box> */}
      <Paper elevation={16}>
        <ContentStyle>
          <Box mt={2} className='bottom-login'>
            <Box sx={{ marginLeft: 'auto' }}>
              {/* <MBFormButton variant='outlined' onClick={openForm}>
                Add WhyChooseUs
              </MBFormButton> */}
              {!choose ?
                <MBFormButton variant='outlined' onClick={openForm}> Add Services and Prices</MBFormButton> : <MBFormButton variant='outlined' onClick={() => handleClick({ choose })}>Update Services and Prices</MBFormButton>
              }
            </Box>
          </Box>
          {formstatus ?
            <MBForm onSubmit={formSubmit}>
              <Stack spacing={3}>
                <MBTextField
                  fullWidth
                  id={'mainheading'} name={'mainheading'} value={mainheading} key={'mainheading'} label={'Mainheading'} error
                  validate={valid}
                  onChange={e => {
                    setMainheading(e.target.value)
                  }}
                />
                <Grid spacing={1} container>
                  <Grid item xs={6}>
                    <fieldset className='fieldset'>
                      <legend>First:</legend>
                      <Stack spacing={3}>
                        <MBTextField
                          fullWidth
                          id={'heading1'} name={'heading1'} value={heading1} key={'heading1'} label={'Heading1'}
                          validate={valid}
                          onChange={e => {
                            setHeading1(e.target.value)
                          }}
                        />
                        <MBTextField
                          fullWidth
                          id={'name'} name={'name'} value={name} key={'name'} label={'Senior citizen fee'}
                          validate={valid}
                          onChange={e => {
                            setName(e.target.value)
                          }}
                        />
                         <MBTextField
                          fullWidth
                          id={'price'} name={'price'} value={price} key={'price'} label={'Price'}
                          validate={valid}
                          onChange={e => {
                            setPrice(e.target.value)
                          }}
                        />
                        <MBTextField
                          fullWidth
                          name={para} value={para} id={para} key={'para'} validate={valid}
                          onChange={e => {
                            setPara(e.target.value)
                          }}
                          label={'adult fee'}
                        />
                         <MBTextField
                          fullWidth
                          id={'price1'} name={'price1'} value={price1} key={'price1'} label={'price1'}
                          validate={valid}
                          onChange={e => {
                            setPrice1(e.target.value)
                          }}
                        />
                        <MBTextField
                          fullWidth
                          name={para1}
                          value={para1} id={para1} key={'para1'} validate={valid}
                          onChange={e => {
                            setPara1(e.target.value)
                          }}
                          label={'youth fee'}
                        />
                         <MBTextField
                          fullWidth
                          id={'price2'} name={'price2'} value={price2} key={'price2'} label={'price2'}
                          validate={valid}
                          onChange={e => {
                            setPrice2(e.target.value)
                          }}
                        />
                        <MBTextField
                          fullWidth
                          name={para2} value={para2} id={para2} key={'para2'} validate={valid}
                          onChange={e => {
                            setPara2(e.target.value)
                          }}
                          label={'Children fee'}
                        />
                        <MBTextField
                          fullWidth
                          id={'price3'} name={'price3'} value={price3} key={'price3'} label={'price3'}
                          validate={valid}
                          onChange={e => {
                            setPrice3(e.target.value)
                          }}
                        />
                      </Stack>
                    </fieldset>
                  </Grid>
                  <Grid item xs={6}>
                    <fieldset className='fieldset'>
                      <legend>Second:</legend>
                      <Stack spacing={3}>
                        <MBTextField
                          fullWidth
                          id={'heading2'} name={'heading2'} value={heading2} key={'heading2'} label={'Heading2'}
                          validate={valid}
                          onChange={e => {
                            setHeading2(e.target.value)
                          }}
                        />
                        <MBTextField
                          fullWidth
                          name={para3} value={para3} id={para3} key={'para3'} validate={valid}
                          onChange={e => {
                            setPara3(e.target.value)
                          }}
                          label={'student group fee'}
                        />
                         <MBTextField
                          fullWidth
                          id={'price4'} name={'price4'} value={price4} key={'price4'} label={'price4'}
                          validate={valid}
                          onChange={e => {
                            setPrice4(e.target.value)
                          }}
                        />
                        <MBTextField
                          fullWidth
                          name={para4} value={para4} id={para4} key={'para4'} validate={valid}
                          onChange={e => {
                            setPara4(e.target.value)
                          }}
                          label={'teachers by an educational institution fee'}
                        />
                         <MBTextField
                          fullWidth
                          id={'price5'} name={'price5'} value={price5} key={'price5'} label={'price5'}
                          validate={valid}
                          onChange={e => {
                            setPrice5(e.target.value)
                          }}
                        />
                      </Stack>
                    </fieldset>
                  </Grid>
                </Grid>
              </Stack>
              {/* <MBTable data={cardsList} head={TABLE_HEAD} /> */}
              <Stack
                direction='row'
                alignItems='right'
                justifyContent='right'
                sx={{ my: 2 }}
              >
                <MBFormButton
                  fullWidth={false}
                  color='error'
                  variant='contained'
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    setValid(false)
                  }}
                  type={'cancel'}
                >
                  Cancel
                </MBFormButton>
                {rowdata ?
                  <MBFormButton onClick={() => {
                    setValid(true)
                  }} type={'submit'} variant="contained" fullWidth={false}>
                    Update
                  </MBFormButton> :
                  <MBFormButton onClick={() => {
                    setValid(true)
                  }} type={'submit'} variant="contained" fullWidth={false}>
                    Submit
                  </MBFormButton>
                }
              </Stack>
            </MBForm> : (
              <>
                <h5 className='w-h5'>{choose.mainheading}</h5>

                <Grid spacing={1} container>
                  <Grid item xs={3}>
                    <div className='w-d-s'>
                        <Typography gutterBottom variant="h5" component="h2">
                          {choose.heading1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.para}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.price1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.para1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.price2}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.para2}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.price3}
                        </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='w-d-s'>
                        <Typography gutterBottom variant="h5" component="h2">
                          {choose.heading2}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.para3}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.price4}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.para4}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {choose.price5}
                        </Typography>
                    </div>
                  </Grid>
                </Grid>
              </>)
          }
        
        </ContentStyle>
      </Paper>

    </>
  )
}
// const mapStateToProps = state => {
//   return {}
// }
// export default connect(mapStateToProps)(ServicesandPrices)
export default ServicesandPrices;


