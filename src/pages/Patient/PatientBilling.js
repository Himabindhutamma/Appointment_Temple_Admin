import React from "react";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MBTable from "../../FunctionalComponents/MBTable/MBTable";
const TABLE_HEAD = [
  { id: "InvoiceNo", label: "Invoice No", alignRight: false },
  { id: "Doctor", label: "Doctor", alignRight: false },
  { id: "Amount", label: "Amount", alignRight: false },
  { id: "PaidOn", label: "Paid On", alignRight: false },
];
const invoiceData = [
  {
    InvoiceNo: "#INV-0010",
    Doctor: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
  {
    InvoiceNo: "#INV-0010",
    Doctor: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
  {
    InvoiceNo: "#INV-0010",
    Doctor: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
  {
    InvoiceNo: "#INV-0010",
    Doctor: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  },
  {
    InvoiceNo: "#INV-0010",
    Doctor: "Richard Wilson",
    Amount: "200",
    PaidOn: "14 OCT 2022",
  }
];
const actions = [
  { icon: "", actionName: "View" },
  { icon: "", actionName: "Print" },
];
const PatientBilling = () => {
  const onAction = (e) => {
    console.log(e);
  };
  return (
    <>
      <Box className="login-block">
        <div className="table-view">
          <span className="white-text mx-0">
            Billing
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
export default PatientBilling;
