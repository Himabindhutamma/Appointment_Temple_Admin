import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Button } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Page from '../../components/Page';
import { Stack, Container, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MBTab from '../../FunctionalComponents/MBTab/MBTab';
// import Banner from './Banner';
import Howweare from './Howweare';
import Emgcall from '../Home/Emgcall';
import axios from 'axios';
import { setISODay } from 'date-fns';
import Banner from './Banner';
import Axios from '../../Services/API';


const Aboutus = ({ }) => {
const [pageState, setPageState] = useState('VIEW');
  const [value, seValue] = useState('');
  const [radioValue, setRadioValue] = useState('Assigned');
  const [tabValue, setTabValue] = useState(1);
  const [dataset, setDataset] = useState([]);
  const [whowearedata, setWhoweareData] = useState('');
  const [emgcall, setEmgcall] = useState('');
  const [wid, setWid] = useState('')
  const [eid, setEid] = useState('')
  const [banner, setBanner] = useState('');
  const [bid, setBid] = useState('')
  const [widb, setWidb] = useState('')
  console.log(wid);

  useEffect(() => {
    console.log(pageState)
  }, [pageState])
  useEffect(()=>{
    getData()
  },[])

  
  const tabChange = (tabValue) => {
    console.log(tabValue);
    setTabValue(tabValue);
  }
  const getData=()=>{
    Axios.getData('SelectAllWithParent_staticPages/')
      .then(res => {
        console.log(res);
        let r = res

        const bfiltered = r.filter(i => {
          return i['name_staticPages'] === 'Aboutus-banner1'
        });
        let bid = bfiltered.find(i => i["staticPageId_staticPages"])
        let bobj = bid["data_staticPages"]
        const bcarrayObj = JSON.parse(bobj);
        setBanner(bcarrayObj);
        setWidb(bid['staticPageId_staticPages'])
        console.log(bcarrayObj);
        console.log(bid);
        console.log(bfiltered);


        const filtered = r.filter(i => {
          return i['name_staticPages'] === 'AWhoWeAreData3'});
        let newarray = filtered.map(i => i["data_staticPages"])
        let wid=filtered.find(i => i["staticPageId_staticPages"])
        let wobj = wid["data_staticPages"]
        const arrayObj = JSON.parse(wobj);
        setWhoweareData(arrayObj);
        setWid(wid['staticPageId_staticPages'])


       
        
        const efiltered = r.filter(i => {
          return i['name_staticPages'] === 'emg1'});
          let eid=efiltered.find(i => i["staticPageId_staticPages"])
          let eobj = eid["data_staticPages"]
          const ecarrayObj = JSON.parse(eobj);
          setEmgcall(ecarrayObj);
          setEid(eid['staticPageId_staticPages'])
          console.log(ecarrayObj);
          console.log(eid);
          console.log(efiltered);

      })
      .catch(err =>{
        console.log(err);
      })
  }
  const tabs = [
    {
      id: 1,
      label: 'Banner',
      component: <><Banner banner={banner} widb={widb} getData={getData} tabValue={tabValue} /></>,
    },
    {
      id: 2,
      label: 'WhoWeAre',
      component: <><Howweare  whowearedata={whowearedata} wid={wid} getData={getData} tabValue={tabValue} /></>,
    },
    // {
    //     id: 3,
    //     label: 'Emergency Call',
    //     component: <><Emgcall eid={eid} getData={getData} emgcall={emgcall} tabValue={tabValue} /></>,
    //   },
     
  ]

  return (
    <>
      <Page title="Aboutus | SKT">
              <>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
             
                 
                </Stack>
                {/* {dataset.heading}
                {dataset.subheading} */}
                {/* {dataset.map((i,j)=>{
                  return(
                    <>
                    <div>{i.heading}</div>
                    <div>{i.para}</div>
                    </>
                  )
                })} */}
                <MBTab tabs={tabs} ></MBTab>
              </>
           </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(Aboutus);
