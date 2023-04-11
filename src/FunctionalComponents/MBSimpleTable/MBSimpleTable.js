import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
  position: 'sticky',
  top: '0px',
  background: 'lightgray',
}

const MBSimpleTable = ({ id, columns, data }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="simple table">
          <TableHead sx={style}>
            <TableRow style={{ height: "10px", padding: "5px 15px" }}>
              {columns.map(({ path, name, height, padding }) => {
                return (
                  <TableCell style={{ height: height, padding: padding }} key={path}>{name}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData) => (
              <TableRow hover style={{ height: "10px", padding: "5px 15px"}}
                key={rowData[id]}
              >
                {columns.map(({ path, height, padding,background }) => {
                  return (
                    <>
                      <TableCell style={{ height: height, padding: padding,}} scope="row" key={path}>
                        {rowData[path]}
                      </TableCell>
                    </>
                  )

                })}
              </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    </>


  );
};

export default MBSimpleTable;