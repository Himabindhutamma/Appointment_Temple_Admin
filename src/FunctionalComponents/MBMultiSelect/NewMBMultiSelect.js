import React, {useState, useEffect} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import {Grid} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import MBListToolbar from "../MBTable/MBListToolbar";

const NewMBMultiSelect = ({title, list, value, onChange, keys}) => {
    const [filteredList, setFilteredList] = useState(list || []);
    const [selectedList, setSelectedList] = useState(value || [])
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        console.log(searchText)
        if (searchText && searchText.length > 0) {
            let fltList = filteredList.filter(i => {
                return JSON.stringify(i).toLowerCase().indexOf(searchText.toLowerCase()) > -1
            });
            setFilteredList(fltList);
        } else {
            setFilteredList(list || []);
        }
    }, [searchText])

    useEffect(() => {
        console.log(selectedList);
        onChange(selectedList);
    }, [selectedList])

    const showValue =  (i,label) =>{
        if(label.indexOf(',') >-1){
            let value = '';
                return label.split(',').map((l,m)=>{
                    if(m !==0){
                        value = value +' - '+i[l];
                    }
                    else{
                        value = i[l];
                    }
                  if(m+1 === label.split(',').length){
                      return value;
                  }
                })
        }
        else{
            return i[label];
        }
    }


    const List =  () => {

        return (
            <Grid container style={{paddingLeft: '5px', maxHeight: '300px', overflow: 'auto'}}>
                {filteredList.map( (i, j) => {
                    let isChecked = selectedList.find(k => {
                        if (i[keys.value] === k[keys.value]) {
                            return true;
                        } else {
                            return false;
                        }

                    });
                    let ind = selectedList.findIndex(k => {
                        return i[keys.value] === k[keys.value]
                    })
                    return (
                        <Grid item className={'listItem'}>
                            <FormControlLabel
                                style={{width: '100%'}}
                                control={
                                    <Checkbox checked={isChecked ? true : false}
                                              onChange={(e) => {
                                                  if (e.target.checked) {
                                                      let copyList = [...selectedList];
                                                      copyList.push(i);
                                                      setSelectedList(copyList);
                                                  } else {
                                                      let copyList = [...selectedList];
                                                      copyList.splice(ind, 1);
                                                      setSelectedList(copyList);
                                                  }
                                              }}
                                    />} label={showValue(i,keys.label)}/>

                        </Grid>
                    )
                })}
            </Grid>
        )
    }


    return (
        <>
            <h6>{title || ''}</h6>
            <MBListToolbar filterText={searchText} onFilterText={setSearchText}/>
            {/*<SearchInput />*/}
            <List/>
        </>

    )
}

export default NewMBMultiSelect;
