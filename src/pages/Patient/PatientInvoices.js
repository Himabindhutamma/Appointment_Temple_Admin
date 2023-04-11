import React, { useState } from "react";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
import Invoices from "./Invoices";
const TABLE_HEAD = [
  { id: "InvoiceNo", label: "Invoice No", alignRight: false },
  { id: "Patient", label: "Patient", alignRight: false },
  { id: "Amount", label: "Amount", alignRight: false },
  { id: "PaidOn", label: "Paid On", alignRight: false },
];
const invoiceData = [
  {
    InvoiceNo: "#INV-0010",
    Patient: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
  {
    InvoiceNo: "#INV-0010",
    Patient: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
  {
    InvoiceNo: "#INV-0010",
    Patient: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
];

const actions = [
  { icon: "", actionName: "View / Print" },
,
];
const PatientInvoices = () => {
  const [invoice,setInvoice]=useState('')
  const onAction = (e) => {
    setInvoice(e.item);
    console.log(e);
  };
  return (
    <>
    {invoice?
  <Invoices/>:  <Box className="login-block">
  <div className="table-view">
    <span className="white-text mx-0">
      INVOICES
    </span>
  </div>
  <MBTable
    data={invoiceData}
    head={TABLE_HEAD}
    actionList={actions}
    onAction={onAction}
  />
</Box>}
  
    </>
  );
};
export default PatientInvoices;
