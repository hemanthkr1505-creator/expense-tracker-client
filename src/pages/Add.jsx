import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import { baseUrl } from '../api';

export default function Add() {
    const navigate=useNavigate();
     const [formData, setformData] = useState({
        title:'',
        amount:0,
        category:"",
    });
    const[isLoading,setIsLoading]=useState(false);
    //console.log(formData);
    const handleSubmit=async()=>{
        //console.log(formData);
        setIsLoading(true);
        try {
            const res=await axios.post(`${baseUrl}/api/expense/insert`,
                formData
            );
           console.log(res)
           if (res.data.success) {
            
               toast.success(res.data.message);
               //navigate("/");
               setTimeout(()=>{
                navigate("/");
               },2000);
           } else {
             toast.error(res.data.message);
            
        }
            
        } catch (error) {
            console.log(error);
            
        }finally{
            setTimeout(()=>{
            setIsLoading(false);
        },2000);
        }
    };

    return (
        
        <div >
            <Box sx={{backgroundColor:""}}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography>Add Expence details</Typography>
                </Box>
                <Box sx={{ backgroundcolor: "red", p: 4, justifyContent: "center", align: "center" }}>
                    <Paper sx={{ width: "90%", p: 3 }}>
                        <TextField value={formData.title}
                        fullWidth onChange={(e)=>setformData({...formData,title:e.target.value})} 
                        label="enter expense title " 
                        placeholder="enter expense title here"
                            sx={{ mb: 2 }} />
                        <TextField value={formData.amount}
                        fullWidth onChange={(e)=>setformData({...formData,amount:e.target.value})}
                        type="number" label="enter expense amount "
                         placeholder="enter expense amount here"
                            sx={{ mb: 2 }} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select expense category</InputLabel>
                            <Select
                            value={formData.category}
                            onChange={(e)=>setformData({...formData,category:e.target.value})}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                // onChange={handleChange}
                                sx={{mb:2}}
                            >
                                <MenuItem value={"Transport"}>Transport</MenuItem>
                                <MenuItem value={"Food"}>Food</MenuItem>
                                <MenuItem value={"othet"}>other</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleSubmit}sx={{ mb: 1 }} variant="contained" fullWidth
                        loading={isLoading}>submit</Button>
                        <Button component={Link} to={"/"} sx={{ mb: 1 }} variant="contained" color="secondary" fullWidth>View entries</Button>
                    </Paper>
                </Box>
            </Box>
        </div>
    )
}
