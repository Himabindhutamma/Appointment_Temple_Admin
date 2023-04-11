import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { typography } from "@mui/system";

const Bredcrum=(props)=>{
    const navigate =useNavigate();
    console.log(props);
    const {location:{pathname}}=props;
    const pathnames=pathname.split('/').filter(x=>x);
    console.log(pathnames)
    return(
        <>
         <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.length>0?  <Link underline="hover"  color="inherit" onClick={()=>navigate('/dashboard/appointments')}>
        Home
        </Link>: <Typography>Home</Typography>
        }
        {pathnames.map((name,index)=>{
            console.log(name)
            const routeTo = `/${pathnames.slice(0,index+1).join('/')}`;
            const isLast=  index===pathnames.length-1;
            console.log(routeTo,isLast);
            return isLast?(
                <Typography onClick={()=>navigate(routeTo)} key={name}>{name}</Typography>
            ):(
                <Link  key = {name}>{name}</Link>
            )
        })};
      </Breadcrumbs>
    </div>
        </>
    );
}
export default Bredcrum;
