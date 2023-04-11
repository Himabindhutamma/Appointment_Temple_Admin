import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {Box} from '@mui/material';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Axios from '../../Services/API'; 

const TABLE_HEAD = [
    {id: 'userVerificationDocumentId_userVerificationDocuments', label: 'Document Id', alignRight: false},
    {id: 'documentPath_userVerificationDocuments', label: 'Document Path', alignRight: false},
    {id:'documentType_userVerificationDocuments', label:'Document Type', alignRight:false},
];
const actions=[{icon:"",actionName:"P"},{icon:"",actionName:"A"}]
const VerificationList = ({onEdit,onClick,onAction}) => {
  const [verificationList,setVerificationList] = useState([]);
  const [list, setList]=useState('');
  console.log(list)

  useEffect(() =>{
    getVerificationList();
  },[])

  const getVerificationList = () =>{
    Axios.getData('SelectAll_userVerificationDocuments')
        .then(res=>{
            console.log(res);
            if(Array.isArray(res)){
            setVerificationList(res.map(i =>{
                return {...i,isVerified_userVerificationDocuments:i.isVerified_userVerificationDocuments == 1 ? 'Verify' : i.isVerified_userVerificationDocuments == 0 ? 'Not Verify' : '--'}
            }))
            }
            else{
                setVerificationList(res);
            }
          }) 
        .catch(err =>{
          console.log(err);
        })
}
const updateVerification = (e)=>{
  console.log(e)
  setList(e.item)
  let data={
    "userVerificationDocumentId_userVerificationDocuments":e.item.userVerificationDocumentId_userVerificationDocuments,
    "isVerified_userVerificationDocuments":e.action === 'P'
  }
  Axios.putData('Update_userVerificationDocuments',data).then((res)=>{
      console.log(res)
      getVerificationList();
  }).catch(err =>{

  })
}

  return (
    <>
    <Box className="login-block">
                <div className="table-view">
                  <span className="white-text mx-3">Verification List</span>
                </div>
                <MBTable data={verificationList} head={TABLE_HEAD} actionList={actions} onAction={(e)=>updateVerification(e)}/>    
      </Box>
      
    </>

  )
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps)(VerificationList)