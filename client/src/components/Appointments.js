import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Typography } from '@mui/material';

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

const Appointments = ()=>{

  const[appnts,setappnt] = useState([])

  const handleDelete = async(app_email)=>{
    try{
      await axios.delete("http://localhost:8801/appointments/"+app_email );
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  const handleUpdate = async(app_email)=>{
    try{
      await axios.put("http://localhost:8801/appointments/"+app_email );
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  React.useEffect(()=>{
    const fetchappnt = async()=>{
    try{
      const res = await axios.get("http://localhost:8801/appointments")
      setappnt(res.data);
      console.log(res)
    }
       
      catch(err){
        console.log(err)
      }
    }
    fetchappnt();
  },[])
  return(
    <>
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" align="left " gutterBottom>
         <b>Recent Appointments</b>
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Phone No</b></TableCell>
            <TableCell><b>Blood Group</b></TableCell>
            <TableCell><b>Donation Camp</b></TableCell>
            <TableCell><b>Donated(Y/N)</b></TableCell>
            <TableCell><b>Operations</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appnts.map(appnt => (
            <TableRow>
              <TableCell>{appnt.app_date}</TableCell>
              <TableCell>{appnt.app_email}</TableCell>
              <TableCell>{appnt.app_name}</TableCell>
              <TableCell>{appnt.app_phone_no}</TableCell>
              <TableCell>{appnt.app_blood_type}</TableCell>
              <TableCell>{appnt.app_camp_address}</TableCell>
              <TableCell>{appnt.app_donated}</TableCell>
              <TableCell><Button variant="success" className="approve" onClick={()=>handleUpdate(appnt.app_email)}>Approve</Button>{''} </TableCell>
              <TableCell> <Button variant="danger" className="delete" onClick={()=>handleDelete(appnt.app_email)}>Delete</Button>{''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/appntlist" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
    </>
  )
}

function preventDefault(event) {
  event.preventDefault();
}

export default Appointments;