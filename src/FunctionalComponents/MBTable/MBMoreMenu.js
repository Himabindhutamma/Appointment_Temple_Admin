import {Icon} from '@iconify/react';
import {useRef, useState} from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {Menu, MenuItem, IconButton, ListItemIcon, ListItemText} from '@mui/material';

// ----------------------------------------------------------------------

export default function MBMoreMenu({item, onAction, actionList}) {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const listItem = (i, j) => {
        return (
            <MenuItem sx={{color: 'text.secondary'}} onClick={()=>{
                // console.log({item,action:i.actionName})
                onAction({item,action:i.actionName})
            }}>
                {i.icon &&
                    <ListItemIcon>
                        <Icon icon={i.icon} width={24} height={24}/>
                    </ListItemIcon>
                }
                <ListItemText primary={i.actionName} primaryTypographyProps={{variant: 'body2'}}/>
            </MenuItem>
        )
    }


    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Icon icon={moreVerticalFill} width={20} height={20}/>
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: {width: 200, maxWidth: '100%'}
                }}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                {actionList.map((i, j) => {
                    return listItem(i, j);
                })}
                {/*<MenuItem sx={{color: 'text.secondary'}}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <Icon icon={trash2Outline} width={24} height={24}/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Delete" primaryTypographyProps={{variant: 'body2'}}/>*/}
                {/*</MenuItem>*/}

                {/*<MenuItem onClick={onEdit} sx={{color: 'text.secondary'}}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <Icon icon={editFill} width={24} height={24}/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Edit" primaryTypographyProps={{variant: 'body2'}}/>*/}
                {/*</MenuItem>*/}
            </Menu>
        </>
    );
}
