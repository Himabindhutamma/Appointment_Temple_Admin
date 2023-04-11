import React from "react";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
const TABLE_HEAD = [
  { id: "ID", label: "ID", alignRight: false },
  { id: "Date", label: "Date", alignRight: false },
  { id: "Description", label: "Description", alignRight: false },
  { id: "Attachment", label: "Attachment", alignRight: false },
  { id: "Created", label: "Created", alignRight: false },
  
  
];
const invoiceData = [
  {
    ID: "#MR-0010",
    Date: "14 OCT 2022",
    Description:"Dental Filling",
    Attachment:"dental-test.pdf",
    Created: "Richard Wilson",
    
  },
  {
    ID: "#MR-0010",
    Date: "14 OCT 2022",
    Description:"Dental Filling",
    Attachment:"dental-test.pdf",
    Created: "Richard Wilson",
    
  },
  {
    ID: "#MR-0010",
    Date: "14 OCT 2022",
    Description:"Dental Filling",
    Attachment:"dental-test.pdf",
    Created: "Richard Wilson",
    
  },
  {
    ID: "#MR-0010",
    Date: "14 OCT 2022",
    Description:"Dental Filling",
    Attachment:"dental-test.pdf",
    Created: "Richard Wilson",
    
  },
  {
    ID: "#MR-0010",
    Date: "14 OCT 2022",
    Description:"Dental Filling",
    Attachment:"dental-test.pdf",
    Created: "Richard Wilson",
    
  }
];
const actions = [
  { icon: "", actionName: "View" },
  { icon: "", actionName: "Print" },
];
const MedicalRecords = () => {
  const onAction = (e) => {
    console.log(e);
  };
  return (
    <>
      <Box className="login-block">
        <div className="table-view">
          <span  className="white-text mx-3">
            MEDICAL RECORDS
          </span>
        </div>
        <MBTable
          data={invoiceData}
          head={TABLE_HEAD}
          actionList={actions}
          onAction={onAction}
        />
      </Box>
    </>
  );
};
export default MedicalRecords;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableRow';
// import TableHead from '@mui/material/TableHead';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import patient from './patient.jpg';
// const row = (x,i,header,handleRemove,startEditing,editIdx) =>{
//     console.log(x,i,header,handleRemove,startEditing,editIdx)
//     const currentlyEditing = editIdx === i;
//     return(
//         <TableRow key={`tr-${i}`}>
//             {header.map((y,k)=>
//             <TableCell key={`trc-${k}`}>
//                 {console.log("y",y,k)}
//                  <h2 className='pat-dash-h2'>
//                   <Link to='/' className='avatar-m'>
//                    <img src={patient} alt='patient'/>
//                   </Link>
//                   <div>
//                       {!Array.isArray(y.prop) ? <>
//                           {x[y.prop]}
//                       </> : <>
//                       {x[y.prop[1]].map((m,n)=>
//                        <>
//                        {console.log("m",m)}
//                        <p>{m.name}</p>
//                        <p>{m.votes}</p>
//                       </>
//                       )}
//                       </> }
                        
//                   </div>
//                  </h2>
//              </TableCell>
             
//             )}
            
//             <TableCell>
//                 <ModeEditOutlineOutlinedIcon onClick={() => startEditing(x)}/>
//             </TableCell>
//             {/* <TableCell>
//             <DeleteOutlineOutlinedIcon onClick={() => handleRemove(i)} />
//             </TableCell> */}
//         </TableRow>
       
//     )
// }
// const MedicalRecords = ({data,header,handleRemove,startEditing,editIdx}) =>{
//     console.log(data,header,editIdx)
//  return(
//      <>
//      <Table>
//          <TableHead>
//              <TableRow>
//                  {header.map((x,i)=>
//                      <TableCell key={`key-${i}`}>{x.name}</TableCell>
//                  )}
                 
//                   {/* { <TableCell>Edit</TableCell> }
//              { <TableCell>Delete</TableCell> } */}
//              </TableRow>
            
//          </TableHead>
//          <TableBody>
//             {data && data.map((x,i)=>
//                  row(x,i,header,handleRemove,startEditing,editIdx)
//              )}
//          </TableBody>
//      </Table>
//      </>
//  )
// }
// export default MedicalRecords