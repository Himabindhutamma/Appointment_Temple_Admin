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
import Banner from './Banner';
import axios from 'axios';
import Content from './Content';
import ServicesandPrices from './ServicesandPrices';
import Emgcall from '../Home/Emgcall';
import Axios from '../../Services/API';

const Departments = ({ }) => {
const [pageState, setPageState] = useState('VIEW');
  const [value, seValue] = useState('');
  const [radioValue, setRadioValue] = useState('Assigned');
  const [tabValue, setTabValue] = useState(1);
  const [dataset, setDataset] = useState([]);
  const [eid, setEid] = useState('');
  const [emgcall, setEmgcall] = useState('');
  const [content, setContent] = useState('');
  const [tid, setTid] = useState('');
  const [cid, setCid] = useState('')
  const [choose, setChoose] = useState('')
  const [wid, setWid] = useState('')
  const [banner, setBanner] = useState('')
  const [widb, setWidb] = useState('')

  console.log(dataset);

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
  // const getData=()=>{
  //   axios.get(`${process.env.REACT_APP_URL}user/getStaticData`)
  //     .then(res =>{
  //     //  let r=res.Message[45].content_staticPages;
  //     //  const obj = JSON.parse(r);
  //     //  console.log(obj);
  //     // setDataset(obj);
  //     // let data1= JSON.parse(r); 
  //       // setData(res.data);
  //       // console.log(data1);
  //     })
  //     .catch(err =>{
  //       console.log(err);
  //     })
  // }
  const getData=()=>{
    Axios.getData('SelectAllWithParent_staticPages/')
      .then(res => {
        console.log(res);
        let r = res
        const bfiltered = r.filter(i => {
          return i['name_staticPages'] === 'dbannerdata1'
        });
        let bid = bfiltered.find(i => i["staticPageId_staticPages"])
        let bobj = bid["content_staticPages"]
        const bcarrayObj = JSON.parse(bobj);
        setBanner(bcarrayObj);
        setWidb(bid['staticPageId_staticPages'])
        console.log(bcarrayObj);
        console.log(bid);
        console.log(bfiltered);

        const tfiltered = r.filter(i => {
          return i['name_staticPages'] === 'dcont1'});
          let tid=tfiltered.find(i => i["staticPageId_staticPages"])
          let tobj = tid["content_staticPages"]
          const tcarrayObj = JSON.parse(tobj);
          setContent(tcarrayObj);
          setTid(tid['staticPageId_staticPages'])
          console.log(tcarrayObj);
          console.log(tid);
          console.log(tfiltered);

       
          
          const chfiltered = r.filter(i => {
          return i['name_staticPages'] === 'dservice1'});
        let cid=chfiltered.find(i => i["staticPageId_staticPages"])
        let cobj = cid["content_staticPages"]
            const carrayObj = JSON.parse(cobj);
            setChoose(carrayObj);
            setCid(cid['staticPageId_staticPages'])
            console.log(carrayObj);
        console.log(cid);
            console.log(chfiltered);
            const efiltered = r.filter(i => {
              return i['name_staticPages'] === 'emg1'});
              let eid=efiltered.find(i => i["staticPageId_staticPages"])
              let eobj = eid["content_staticPages"]
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
      component: <><Banner  banner={banner} widb={widb} getData={getData} tabValue={tabValue} /></>,
    },
    {
      id: 2,
      label: 'Content',
      component: <><Content tid={tid} getData={getData} content={content} tabValue={tabValue} /></>,
    },
    {
      id: 3,
      label: 'Services and Prices',
      component: <><ServicesandPrices cid={cid} getData={getData} choose={choose} tabValue={tabValue} /></>,
    },
    {
      id: 4,
      label: 'Emergency Call',
      component: <><Emgcall eid={eid} getData={getData} emgcall={emgcall} tabValue={tabValue} /></>,
    },
  ]

  return (
    <>
      <Page title="Departments | SKT">
              <>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                  EVENTS
                  </Typography>
                 
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


export default connect(mapStateToProps)(Departments);