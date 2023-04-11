import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



export default function MBTabs({onChange,tabs,className}) {
  console.log(className)
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    if(onChange){
      onChange(newValue)
    }
    
  };

  return (
    <Box sx={{ width: '100%',marginTop:'20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {
            tabs.map( tab => (
              <Tab className={className}
                key={tab.id}
                label={tab.label}
                value={tab.id}
              />
            ))
            }
        </Tabs>
      </Box>
      {
             tabs.map( (tab,index) => (
                <TabPanel variant="scrollable" value={value} index={index+1}>
                {tab.component}
                </TabPanel>
              ))
            }

    </Box>
  );
}
