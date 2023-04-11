import React,{useState,useEffect} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const MBMultiSelect = ({options,
  name,
  validate,
  onChange,
  id,
  className,
  value,
  label,
  keys,
  required,}) =>{
  const [selectedValue, setSelectedValue] = useState(value ?? '');
  const [isError, checkError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (validate && required) {
      if (selectedValue.toString().trim() && selectedValue.toString().trim().length > 0) {
        checkError(false);
        setErrorMsg('');
      } else {
        checkError(true);
        setErrorMsg('Please Select a value');
      }
    }
  }, [selectedValue, validate]);

  const handleChange = (e) => {
    const {target: { value },} = e;
    setSelectedValue(typeof value === 'string' ? value.split(',') : value,);
    if (onChange) {
      onChange(e.target.value);
      console.log(e.target.value);
    }
  };

    return(
        <div>
        <FormControl sx={{ m: 1, width: 500 }} error={isError}>
          <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedValue}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            required={required || false}

          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={selectedValue.indexOf(option.value) > -1} />
                <ListItemText primary={option.label ?? option.value} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errorMsg}</FormHelperText>
        </FormControl>
      </div>
    )
}
export default MBMultiSelect

