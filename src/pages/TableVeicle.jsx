import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import ThemeContext from "../context/theme/ThemeContext";
const modalstyle = {
	position: "absolute",
	top: "80%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1000,
  height: 1000,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
  overflow: "scroll"
};

function createData(date, wagonsequence, sackinward, sackoutward, aggregatebags) {
  return {date, wagonsequence, sackinward, sackoutward, aggregatebags };
}


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  


export default function TableVehicle(props) {

  const a = {state:false};
  let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

  const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [orderDirection,setOrderDirection] = React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy] = React.useState('name');

    const handleRequestSort = (event,property) => {
      const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
      setValueToOrderBy(property)
      setOrderDirection(isAscending ? 'desc' : 'asc')
    }

    const createSortHandler = (property) => (event) => {
      handleRequestSort(event,property)
    }

    const rows = [
      createData( '2022-03-01', 22923081507, 324,3,321),
      createData('2022-03-01', 22341943286, 629,167,462),
      createData('2022-03-01', 22341943286, 195,207,12),
      createData( '2022-03-01', 22341943286, 758,144,614),
      createData('2022-03-01', 22341943286, 252,942,690),
      createData('2022-03-01', 22341943286, 898,650,248),
      createData( '2022-03-01', 22341943286,618,417,201),
      createData('2022-03-01', 22341943286, 640,175,465),
      createData('2022-03-01', 22341943286, 613,861,248),
      createData( '2022-03-01', 22341943286, 27,757,730),
      createData('2022-03-01', 22341943286, 76,0,76),
      createData('2022-03-01', 61, 62,0,62),
      createData( '2022-03-01', 23, 36,0,36),
      createData('2022-03-01', 1, 1501,1,1500),
      createData('2022-03-01', 2, 821,0,821),
    ];
    
    function descendingComparator(a,b,orderBy){
      if(b[orderBy] < a[orderBy]){
        return -1
      }
      if(b[orderBy] > a[orderBy]){
        return 1
      }
      return 0
    }

    function getComparator(order, orderBy)
    {
      return order === "desc"
         ? (a,b) => descendingComparator(a,b,orderBy)
         : (a,b) => -descendingComparator(a,b,orderBy)
    }
  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index)=> [el, index])
    stabilizedRowArray.sort((a,b) => {
      const order = comparator(a[0],b[0])
      if(order !=0) return order
      return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
  }

  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  return (
    <>
    <TableContainer component={Paper} style={{ backgroundColor: a.state ? '#303134' : 'white'}}>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead style={{backgroundColor: a.state ? '#303134' : 'white'}}>
          <TableRow style={{backgroundColor: a.state ? 'rgb(88, 147, 241)' : 'rgb(88, 147, 241)'}}>
            {/* <TableCell style={{color:"white"}}>Id</TableCell> */}
            <TableCell key="date" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "date"} direction={valueToOrderBy === "date" ? orderDirection : "asc"} onClick={createSortHandler('date')}>Date</TableSortLabel></TableCell>
            <TableCell key="camera_id" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "camera_id"} direction={valueToOrderBy === "camera_id" ? orderDirection : "asc"} onClick={createSortHandler('camera_id')}>Camera Id</TableSortLabel></TableCell>
            <TableCell key="time" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "time"} direction={valueToOrderBy === "time" ? orderDirection : "asc"} onClick={createSortHandler('time')}>Time</TableSortLabel></TableCell>
            <TableCell key="vehicle_type" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "vehicle_type"} direction={valueToOrderBy === "vehicle_type" ? orderDirection : "asc"} onClick={createSortHandler('vehicle_type')}>Vehicle Type</TableSortLabel></TableCell>
            <TableCell key="license_plate_number" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "license_plate_number"} direction={valueToOrderBy === "license_plate_number" ? orderDirection : "asc"} onClick={createSortHandler('license_plate_number')}>License Plate Number</TableSortLabel></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:  a.state ? '#303134' : 'white'}}>
          {props.data && (rowsPerPage > 0
            ? sortedRowInformation(props.data,getComparator(orderDirection,valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sortedRowInformation(props.data,getComparator(orderDirection,valueToOrderBy))
          ).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              {/* <TableCell component="th" scope="row" style={{color: a.state ? "white" : "black"}}>{row.id}</TableCell> */}
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.date}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.camera_id}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.time}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.vehicle_type}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.license_plate_number}</TableCell>
            </TableRow>
          ))}
         
        </TableBody>
        <TableFooter style={{backgroundColor: a.state ? '#303134' : 'white' ,color: a.state ? "white" : "black"}}>
          <TableRow style={{backgroundColor: a.state ? '#303134' : 'white' ,color: a.state ? "white" : "black"}}>
            <TablePagination
            style={{backgroundColor: a.state ? '#303134' : 'white',color: a.state ? "white" : "black"}}
             // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.data && props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
            //   SelectProps={{
            //     inputProps: {
            //       'aria-label': 'rows per page',
            //     },
            //     native: true,
            //   }}
              onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <Modal
    open={open}
    onClose={handleClose}>
    <div style={{height:"90%",width:"90%",overflowY:'scroll',backgroundColor:"white",margin:"auto",padding:"10px",marginTop:"30px" }}>
          {/* <div> 
                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg} onClick={()=>handleClose()}/>
            </div> */}
    </div>
  </Modal>
  </>
  );
}