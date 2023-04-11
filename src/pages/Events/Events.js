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
import Emgcall from '../Home/Emgcall';
import Axios from '../../Services/API';
import Cards from './Cards';

const Events = ({ }) => {
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
  const [news, setNews] = useState(null);
  const [nid, setNid] = useState('')

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
          return i['name_staticPages'] === 'ENew-Banner2'
        });
        let bid = bfiltered.find(i => i["staticPageId_staticPages"])
        let bobj = bid["content_staticPages"]
        const bcarrayObj = JSON.parse(bobj);
        setBanner(bcarrayObj);
        setWidb(bid['staticPageId_staticPages'])
        console.log(bcarrayObj);
        console.log(bid);
        console.log(bfiltered);

        const lfiltered = r.filter(i => {
          return i['name_staticPages'] === 'eventcardone'
        });
        let lbid = lfiltered.find(i => i["staticPageId_staticPages"])
        let lobj = lbid["content_staticPages"]
        const lcarrayObj = JSON.parse(lobj);
        console.log("data", lbid);
        setNews(lcarrayObj);
        setNid(lbid['staticPageId_staticPages'])
        console.log(lcarrayObj);
        console.log(lbid);
        console.log(lfiltered);

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
      label: 'Cards',
      component: <><Cards nid={nid} getData={getData} news={news} tabValue={tabValue} /></>,
    },
   {
      id: 3,
      label: 'Emergency Call',
      component: <><Emgcall eid={eid} getData={getData} emgcall={emgcall} tabValue={tabValue} /></>,
    },
  ]

  return (
    <>
      <Page title="YOGA | SKT">
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


export default connect(mapStateToProps)(Events);