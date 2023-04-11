import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import patient from './patient.jpg';
const row = (x,i,header,handleRemove,startEditing,editIdx) =>{
    console.log(x,i,header,handleRemove,startEditing,editIdx)
    const currentlyEditing = editIdx === i;
    return(
        <TableRow key={`tr-${i}`}>
            {header.map((y,k)=>
            <TableCell key={`trc-${k}`}>
                {console.log("y",y,k)}
                 <h2 className='pat-dash-h2'>
                  <Link to='/' className='avatar-m'>
                   <img src={patient} alt='patient'/>
                  </Link>
                  <div>
                      {!Array.isArray(y.prop) ? <>
                          {x[y.prop]}
                      </> : <>
                      {x[y.prop[1]].map((m,n)=>
                       <>
                       {console.log("m",m)}
                       <p>{m.name}</p>
                       <p>{m.votes}</p>
                      </>
                      )}
                      </> }
                        
                  </div>
                 </h2>
             </TableCell>
             
            )}
            
            <TableCell>
                <ModeEditOutlineOutlinedIcon onClick={() => startEditing(x)}/>
            </TableCell>
            {/* <TableCell>
            <DeleteOutlineOutlinedIcon onClick={() => handleRemove(i)} />
            </TableCell> */}
        </TableRow>
       
    )
}
const ReusableTable = ({data,header,handleRemove,startEditing,editIdx}) =>{
    console.log(data,header,editIdx)
 return(
     <>
     <Table>
         <TableHead>
             <TableRow>
                 {header.map((x,i)=>
                     <TableCell key={`key-${i}`}>{x.name}</TableCell>
                 )}
                 
                  {/* <TableCell>Edit</TableCell> */}
             {/* <TableCell>Delete</TableCell> */}
             </TableRow>
            
         </TableHead>
         <TableBody>
            {data && data.map((x,i)=>
                 row(x,i,header,handleRemove,startEditing,editIdx)
             )}
         </TableBody>
     </Table>
     </>
 )
}
export default ReusableTable