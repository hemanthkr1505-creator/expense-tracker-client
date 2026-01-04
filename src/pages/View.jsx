import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpenceTable from '../components/Table'
import FloatingAddButton from '../components/FlotingAddButton'
import axios from 'axios';
import { baseUrl } from '../api';

export default function View() {
  const [allExpenses, setallExpenses] = useState([]);
  const fetchAllExpenses = async()=>{
    try {
      const res=await axios.get(`${baseUrl}/api/expense/view-all`)
     // console.log(res.data)
     if (res.data.success) {
      setallExpenses(res.data.expenses);
     }
      
    } catch (error) {
      console.log(error)
      
    }
  };
  useEffect(()=>{
    fetchAllExpenses();
  },[]);
  //console.log(allExpenses);
  return(
  <Box>
    <Box sx={{textAlign:"center"}}>
        <Typography variant='h4'>Expence List</Typography>
    </Box>
    <Box sx={{p:2}}>
        <ExpenceTable allExpenses={allExpenses}fetchAllExpenses ={fetchAllExpenses}/>
        
    </Box>
    <FloatingAddButton/>
  </Box> 
    
  )
  
}
