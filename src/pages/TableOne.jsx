import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { FaAffiliatetheme, FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from "@mui/material/Typography";
import TableSortLabel from '@mui/material/TableSortLabel';
import Modal from "@mui/material/Modal";
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
import Accordian from "../components/Accordian";
import Accordian2 from "../components/Accordian2";

const modalstyle = {
	position: "absolute",
	top: "80%",
	left: "0px",
	transform: "translate(-50%, -50%)",
	width: 1000,
  height: 1000,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
  overflow: "scroll"
};

function createData(id, date, time, wagon_sequence, sack_inward, sack_outward, aggregate_bags,camera,actions,images) {
  return { id, date, time, wagon_sequence, sack_inward, sack_outward, aggregate_bags,camera,actions,images };
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
  


export default function TableOne(props) {

  const a = true;
  let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

  const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [orderDirection,setOrderDirection] = React.useState('asc');
    const [valueToOrderBy,setValueToOrderBy] = React.useState('name');
    const [low,setLow] = React.useState([]);
    const [medium,setMedium] = React.useState([]);
    const [high,setHigh] = React.useState([]);
    const [discardlow,setDiscardLow] = React.useState([]);
    const [discardmedium,setDiscardMedium] = React.useState([]);
    const [discardhigh,setDiscardHigh] = React.useState([]);
    const [row,setRow] = React.useState([]);



    const handleRequestSort = (event,property) => {
      const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
      setValueToOrderBy(property)
      setOrderDirection(isAscending ? 'desc' : 'asc')
    }

    const createSortHandler = (property) => (event) => {
      handleRequestSort(event,property)
    }

    const rows = [
      createData('621d3b73f2c703d4b8cbe2af', '2022-03-01', '02:45 AM', 1, 1,0,1,'M/C 1_1',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2ag', '2022-03-02', '02:47 AM', 1, 1,0,1,'M/C 1_2',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2ah', '2022-03-03', '02:57 AM', 1, 1,0,1,'M/C 1_3',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2ai', '2022-03-04', '04:45 AM', 1, 1,0,1,'M/C 1_4',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2aj', '2022-03-05', '03:45 AM', 1, 1,0,1,'M/C 1_5',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2ak', '2022-03-06', '02:33 AM', 1, 1,0,1,'M/C 1_6',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2al', '2022-03-07', '02:35 AM', 1, 1,0,1,'M/C 1_7',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2am', '2022-03-08', '02:43 AM', 1, 1,0,1,'M/C 1_8',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2an', '2022-03-09', '06:45 AM', 1, 1,0,1,'M/C 1_9',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
      createData('621d3b73f2c703d4b8cbe2ao', '2022-03-10', '06:45 AM', 1, 1,0,1,'M/C 1_10',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
       createData('621d3b73f2c703d4b8cbe2ap', '2022-03-11', '04:44 AM', 1, 1,0,1,'M/C 1_11',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
        createData('621d3b73f2c703d4b8cbe2aq', '2022-03-12', '03:45 AM', 1, 1,0,1,'M/C 1_12',<FaPen style={{cursor:"pointer"}}/>,<FaEye style={{cursor:"pointer"}} onClick={handleOpen}/>),
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
          <TableRow style={{backgroundColor: a.state ? 'red' : 'red'}}>
            {/* <TableCell style={{color:"white"}}>Id</TableCell> */}
            <TableCell key="date" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "date"} direction={valueToOrderBy === "date" ? orderDirection : "asc"} onClick={createSortHandler('date')}>Date</TableSortLabel></TableCell>
            <TableCell key="time" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "time"} direction={valueToOrderBy === "time" ? orderDirection : "asc"} onClick={createSortHandler('time')}>Time</TableSortLabel></TableCell>
            <TableCell key="wagon_sequence" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "wagon_sequence"} direction={valueToOrderBy === "wagon_sequence" ? orderDirection : "asc"} onClick={createSortHandler('wagon_sequence')}>Wagon Sequence</TableSortLabel></TableCell>
            <TableCell key="sack_inward" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "sack_inward"} direction={valueToOrderBy === "sack_inward" ? orderDirection : "asc"} onClick={createSortHandler('sack_inward')}>Sack Inward</TableSortLabel></TableCell>
            <TableCell key="sack_outward" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "sack_outward"} direction={valueToOrderBy === "sack_outward" ? orderDirection : "asc"} onClick={createSortHandler('sack_outward')}>Sack Outward</TableSortLabel></TableCell>
            <TableCell key="aggregate_bags" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "aggregate_bags"} direction={valueToOrderBy === "aggregate_bags" ? orderDirection : "asc"} onClick={createSortHandler('aggregate_bags')}>Aggregate Bags</TableSortLabel></TableCell>
            <TableCell key="camera_name" style={{color:"white"}} align="right"><TableSortLabel active={valueToOrderBy === "camera_name"} direction={valueToOrderBy === "camera_name" ? orderDirection : "asc"} onClick={createSortHandler('camera_name')}>Camera</TableSortLabel></TableCell>
            {/* <TableCell style={{color:"white"}} align="right">Actions</TableCell> */}
            <TableCell style={{color:"white"}} align="right">View Images</TableCell>
            <TableCell style={{color:"white"}} align="right">Confidence</TableCell>

          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:  a.state ? '#303134' : 'white'}}>
          {props.data.data && (rowsPerPage > 0
            ? sortedRowInformation(props.data.data,getComparator(orderDirection,valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sortedRowInformation(props.data.data,getComparator(orderDirection,valueToOrderBy))
          ).map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              {/* <TableCell component="th" scope="row" style={{color: a.state ? "white" : "black"}}>{row.id}</TableCell> */}
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.date}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.time}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.wagon_sequence}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.sack_inward}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.sack_outward}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.aggregate_bags}</TableCell>
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.camera_name}</TableCell>
              {/* <TableCell align="right" style={{color: a.state ? "white" : "black"}}>{row.actions}</TableCell> */}
              <TableCell align="right" style={{color: a.state ? "white" : "black"}}><FaEye style={{cursor:"pointer"}} onClick={function(event){
      handleOpen();
      setLow(row.low_confidance);
      setMedium(row.medium_confidance);
      setHigh(row.high_confidance);
    
      setRow(row);

      setDiscardLow(row.discard_low);
      setDiscardMedium(row.discard_medium);
      setDiscardHigh(row.discard_high);
   }}/></TableCell>
              <TableCell  align="right" style={{color: a.state ? "white" : "black"}}><p style={{color: "green", WebkitTextStroke:"0.2px white"}}>{row.high_confidance.length}H</p><p style={{color : "blue",WebkitTextStroke:"0.2px white"}}>{row.medium_confidance.length}M</p><p style={{color: "red",WebkitTextStroke:"0.2px white"}}>{row.low_confidance.length}L</p></TableCell>


            </TableRow>
          ))}
         
        </TableBody>
        <TableFooter style={{backgroundColor: a.state ? '#303134' : 'white' ,color: a.state ? "white" : "black"}}>
          <TableRow style={{backgroundColor: a.state ? '#303134' : 'white' ,color: a.state ? "white" : "black"}}>
            <TablePagination
            style={{backgroundColor: a.state ? '#303134' : 'white',color: a.state ? "white" : "black"}}
             // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={props.data.data && props.data.data.length}
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
    onClose={function(){handleClose()}}>
    <div style={{height:"90%",width:"90%",overflowY:'scroll',backgroundColor:"white",margin:"auto",padding:"10px",marginTop:"30px" }}>
          {/* <div> 
                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg} onClick={()=>handleClose()}/>
            </div> */}
      <Accordian low={low} medium={medium} high={high} row={row}/>
      <Accordian2 discardlow={discardlow} discardmedium={discardmedium} discardhigh={discardhigh} row={row}/>

    </div>
  </Modal>
  </>
  );
}