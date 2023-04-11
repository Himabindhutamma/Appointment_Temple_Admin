import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router';


const MBBreadcrumb = props =>{
    const navigate = useNavigate();
    console.log("props", props)
    const { history, location:{pathname}} = props;
    const pathnames = pathname.split("/dashboard/").filter(x => x);
    console.log(pathnames);
    console.log(pathname);
    return(
        <>
       <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
          {pathnames.length > 0 ? (
              <Link onClick={() => navigate('/dashboard/doctorsdashboard')}>Home</Link>
          ) : (
           <Typography>Home</Typography>
          )}
          {pathnames.map((name, index) => {
            console.log("name", name)
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
       const isLast = index === pathnames.length - 1;
         console.log(routeTo,isLast)
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link key={name}  onClick={()=>navigate(routeTo)}>
            {name}
          </Link>
        );
      })}
        
      </Breadcrumbs>
    </div>
        </>
    )
}
export default MBBreadcrumb;