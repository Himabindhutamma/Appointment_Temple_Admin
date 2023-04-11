import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {useEffect} from "react";

const filter = createFilterOptions();

const  MBSearchList = ({onChange,data,obj,label,className}) => {
    const [value, setValue] = React.useState(null);

    useEffect(()=>{
        console.log(value);
        if(onChange){
            onChange(value);
        }
        
    },[value])

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={data}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option[obj.label];
            }}
            renderOption={(props, option) => <li {...props}>{option[obj.label]}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField className={className} {...params} label={label} InputLabelProps={{
                    shrink: true,
                }}/>
            )}
        />
    );
}
export default MBSearchList
