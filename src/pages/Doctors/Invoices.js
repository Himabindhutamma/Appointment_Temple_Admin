import React from 'react';
import MBTable from '../../FunctionalComponents/MBTable/MBTable';
const TABLE_HEAD = [
    {id: 'InvoiceNo', label: 'Invoice No', alignRight: false},
    {id: 'Patient', label: 'Patient', alignRight: false},
    {id: 'Amount', label: 'Amount', alignRight: false},
    {id:'PaidOn', label:'Paid On', alignRight:false},

];
const invoiceData = [{InvoiceNo:'#INV-0010',Patient:'Richard Wilson',Amount:'200',PaidOn:'14 OCT 2022'},
{InvoiceNo:'#INV-0010',Patient:'Richard Wilson',Amount:'200',PaidOn:'14 OCT 2022'},
{InvoiceNo:'#INV-0010',Patient:'Richard Wilson',Amount:'200',PaidOn:'14 OCT 2022'}]
const actions = [{icon: "", actionName: "View"},{icon: "", actionName: "Print"}];
const Invoices = () =>{
    const onAction = (e)=>{
        console.log(e);
    }
    return(
        <>
         <MBTable data={invoiceData} head={TABLE_HEAD}  actionList={actions} onAction={onAction}/> 
        </>
    )
}
export default Invoices