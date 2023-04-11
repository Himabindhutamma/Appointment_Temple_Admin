import React from "react";
import { Box, Button } from "@mui/material";
import { Grid, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
const InvoiceFrom=[
    {id:'',label:'Walter Roberson',address:'299 Star Trek Drive, Panama City,Florida, 32405, USA'},
]
const InvoiceTo=[
    {id:'',label:'Dr. Darren Elder',address:'806 Twin Willow Lane, Old Forge,Newyork, USA'},
]
const TABLE_HEAD = [
    { id: "Description", label: "Description", alignRight: false },
    { id: "Quantity", label: "Quantity", alignRight: false },
    { id: "Vat", label: "VAT", alignRight: false },
    { id: "Total", label: "Total", alignRight: false },
  ];
  const invoiceData = [
    {
      Description: "General Consultation",
      Quantity: "1",
      Vat: "$20",
      Total: "$20",
    },
    {
      Description: "Video Call Booking",
      Quantity: "1",
      Vat: "$20",
      Total: "$20",
    },
  ];
const Invoices =()=>{
    const handleClick=()=>{
        console.log('Clicked')
        window.print();
    }
  
    return(

    <>
    <Box className="login-block">
  <div className="table-view">
    <span className="white-text mx-0">
      Invoice View
    </span></div>
     <Grid item xs={12} md={6}>
        {/* <Item>{InvoiceFrom}</Item>
        <Item>{InvoiceTo}</Item> */}
    </Grid>
    <Table
    data={invoiceData}
    head={TABLE_HEAD}
  />
  <div>
    <h2>Other Information</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.</p>
  </div>
    </Box>

    <Button variant="contained" onClick={handleClick}>Print</Button>

    </>
    )
}
export default Invoices;