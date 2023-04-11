import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {filter} from 'lodash';
import Card from '@mui/material/Card';
import MBListToolbar from './MBListToolbar';
import MBListHead from './MBListHead';
import SearchNotFound from '../../components/SearchNotFound';
import MBMoreMenu from './MBMoreMenu';
import TablePagination from '@mui/material/TablePagination';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_item) => JSON.stringify(_item).toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const MBTable = ({data , head, onAction, onRowClick, orderKey,onDelete,numRows, actionList}) => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(orderKey || head[0].id);
    const [filterText, setFilterText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(numRows || 5);
    const [filteredList, setFilteredList] = useState(data || []);
    const [emptyRows, setEmptyRows] = useState(0);

    useEffect(() => {
        updateList(filterText);
    }, [])

    useEffect(() => {
        updateList(filterText);
    }, [data])

    useEffect(() => {
        if (page > 0) {
            setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - filteredList.length))
        } else {
            setEmptyRows(0)
        }
    }, [page, rowsPerPage, filteredList])

    useEffect(() => {
        updateList(filterText);
    }, [filterText, orderBy, order])

    const updateList = (filterText) => {
        setFilteredList(applySortFilter(data, getComparator(order, orderBy), filterText));
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (value) => {
        setFilterText(value);
    };

    const MBody = () => (
        <TableBody>
            {filteredList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i, j) => MRows(j, i))}
            {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                    <TableCell colSpan={6}/>
                </TableRow>
            )}
        </TableBody>
    );

    const MRows = (index, row) => (
        <TableRow hover key={index} onClick={onRowClick} style={'color' in row ? {backgroundColor:row.color || "#ffffff"} :{}}>
            <MColumns columnData={row}/>
            {actionList && actionList.length > 0 &&
                <TableCell align="right">
                    <MBMoreMenu actionList={actionList} item={row} onAction={(e) =>{
                        console.log(e);
                        onAction(e);
                    }}/>
                </TableCell>
            }

        </TableRow>
    );

    const MColumns = ({columnData}) => head.map(col => <TableCell
        align={col.alignRight ? 'right' : 'left'}>{columnData[col.id]}</TableCell>)

    return (
        <Card>
            <div style={{margin: "33px 11px 9px 25px", width: '240px'}}>
                <MBListToolbar
                    filterText={filterText}
                    onFilterText={handleFilterByName}
                />
            </div>

            <TableContainer>
                <Table>
                    <MBListHead actionList={actionList}
                        order={order}
                        orderBy={orderBy}
                        headLabel={head}
                        onRequestSort={handleRequestSort}
                    />
                    <MBody/>
                    {filteredList.length === 0 ?
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                    <SearchNotFound searchQuery={filterText}
                                                    type={data.length > 0 ? 'search' : 'noData'}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        : null}
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
};

export default MBTable;
