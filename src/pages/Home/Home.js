import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Page from '../../components/Page';
import { Stack, Container, Typography } from '@mui/material';
import MBTab from '../../FunctionalComponents/MBTab/MBTab';
import Banner from './Banner';
import Howweare from './Howweare';
import WhyChooseUs1 from './WhyChooseUs1';
import Cards from './Cards';
import Ourreal from './Ourreal';
import Ourspecialists from './Ourspecialists';
import Latestnews from './Latestnews';
import Emgcall from './Emgcall';
import Axios from '../../Services/API';




const Home = ({ }) => {
  const [pageState, setPageState] = useState('VIEW');
  const [tabValue, setTabValue] = useState(1);
  const [dataset, setDataset] = useState([]);
  const [whowearedata, setWhoweareData] = useState('');
  const [emgcall, setEmgcall] = useState('');
  const [wid, setWid] = useState('')
  const [response, setResponse] = useState('')
  const [cid, setCid] = useState('')
  const [chooseData, setChooseData] = useState('')
  const [eid, setEid] = useState('')
  const [testimonials, setTestimonials] = useState('');
  const [tid, setTid] = useState('');
  const [banner, setBanner] = useState('')
  const [widb, setWidb] = useState('')
  const [cid1, setCid1] = useState('')
  const [dataset1, setDataset1] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [did, setDid] = useState('')
  const [news, setNews] = useState(null);
  const [nid, setNid] = useState('')
  console.log(doctor);

  useEffect(() => {
    console.log(pageState)
  }, [pageState])
  useEffect(() => {
    getData()
  }, [])


  const tabChange = (tabValue) => {
    console.log(tabValue);
    setTabValue(tabValue);
  }
  const getData = () => {
    Axios.getData('SelectAll_staticPages/')
      .then(res => {
        console.log(res);
        let r = res
        const bfiltered = r.filter(i => {
          return i['name_staticPages'] === 'New-Banner2'
        });
        let bid = bfiltered.find(i => i["staticPageId_staticPages"])
        let bobj = bid["data_staticPages"]
        const bcarrayObj = JSON.parse(bobj);
        setBanner(bcarrayObj);
        setWidb(bid['staticPageId_staticPages'])
        console.log(bcarrayObj);
        console.log(bid);
        console.log(bfiltered);

        const hfiltered = r.filter(i => {
          return i['name_staticPages'] === 'banner-card5'
        });
        let hbid = hfiltered.find(i => i["staticPageId_staticPages"])
        let hobj = hbid["data_staticPages"]
        const hcarrayObj = JSON.parse(hobj);
        setDataset1(hcarrayObj);
        setCid1(hbid['staticPageId_staticPages'])
        console.log(hcarrayObj);
        console.log(hbid);
        console.log(hfiltered);

        const filtered = r.filter(i => {
          return i['name_staticPages'] === 'WhoWeAre-1'
        });
        let newarray = filtered.map(i => i["data_staticPages"])
        let wid = filtered.find(i => i["staticPageId_staticPages"])
        let wobj = wid["data_staticPages"]
        const arrayObj = JSON.parse(wobj);
        setWhoweareData(arrayObj);
        setWid(wid['staticPageId_staticPages'])

        const chfiltered = r.filter(i => {
          return i['name_staticPages'] === 'WhyChooseUs'
        });
        let cid = chfiltered.find(i => i["staticPageId_staticPages"])
        let cobj = cid["data_staticPages"]
        const carrayObj = JSON.parse(cobj);
        setChooseData(carrayObj);
        setCid(cid['staticPageId_staticPages'])
        console.log(carrayObj);
        console.log(cid);
        console.log(chfiltered);

        const tfiltered = r.filter(i => {
          return i['name_staticPages'] === 'Test1'
        });
        let tid = tfiltered.find(i => i["staticPageId_staticPages"])
        let tobj = tid["data_staticPages"]
        const tcarrayObj = JSON.parse(tobj);
        setTestimonials(tcarrayObj);
        setTid(tid['staticPageId_staticPages'])
        console.log(tcarrayObj);
        console.log(tid);
        console.log(tfiltered);

        const dfiltered = r.filter(i => {
          return i['name_staticPages'] === 'doctorsdata4'
        });
        let dbid = dfiltered.find(i => i["staticPageId_staticPages"])
        let dobj = dbid["data_staticPages"]
        const dcarrayObj = JSON.parse(dobj);
        console.log("data", dbid);
        setDoctor(dcarrayObj);
        setDid(dbid['staticPageId_staticPages'])
        console.log(dcarrayObj);
        console.log(dbid);
        console.log(dfiltered);

        const lfiltered = r.filter(i => {
          return i['name_staticPages'] === 'latestnew4'
        });
        let lbid = lfiltered.find(i => i["staticPageId_staticPages"])
        let lobj = lbid["data_staticPages"]
        const lcarrayObj = JSON.parse(lobj);
        console.log("data", lbid);
        setNews(lcarrayObj);
        setNid(lbid['staticPageId_staticPages'])
        console.log(lcarrayObj);
        console.log(lbid);
        console.log(lfiltered);
        
        const efiltered = r.filter(i => {
          return i['name_staticPages'] === 'emg1'
        });
        let eid = efiltered.find(i => i["staticPageId_staticPages"])
        let eobj = eid["data_staticPages"]
        const ecarrayObj = JSON.parse(eobj);
        setEmgcall(ecarrayObj);
        setEid(eid['staticPageId_staticPages'])
        console.log(ecarrayObj);
        console.log(eid);
        console.log(efiltered);
})
      .catch(err => {
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
      label: 'Cards',
      component: <><Cards cid1={cid1} getData={getData} dataset1={dataset1} tabValue={tabValue} /></>,
    },
    {
      id: 3,
      label: 'WhoWeAre',
      component: <><Howweare whowearedata={whowearedata} wid={wid} getData={getData} tabValue={tabValue} /></>,
    },
    {
      id: 4,
      label: 'WhyChooseUs',
      component: <><WhyChooseUs1 tabValue={tabValue} cid={cid} getData={getData} chooseData={chooseData} /></>,
    },
    {
      id: 5,
      label: 'Testimonials',
      component: <><Ourreal tid={tid} getData={getData} testimonials={testimonials} tabValue={tabValue} /></>,
    },
    {
      id: 6,
      label: 'OurDoctors',
      component: <><Ourspecialists did={did} getData={getData} doctor={doctor} tabValue={tabValue} /></>,
    },
    // {
    //   id: 7,
    //   label: 'Emergency Call',
    //   component: <><Emgcall eid={eid} getData={getData} emgcall={emgcall} tabValue={tabValue} /></>,
    // },

    {
      id: 7,
      label: 'Blogs',
      component: <><Latestnews nid={nid} getData={getData} news={news} tabValue={tabValue} /></>,
    },

  ]

  return (
    <>
      <Page title="Home | SKT">
          <>
            <Stack direction="row" alignItems="center" justifydata="space-between" mb={5}>

            </Stack>
           {dataset.heading}
            <MBTab tabs={tabs} ></MBTab>
          </>
        </Page>

    </>
  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(Home);