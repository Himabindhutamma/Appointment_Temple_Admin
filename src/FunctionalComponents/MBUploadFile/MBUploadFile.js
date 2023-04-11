import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone'

const MBUploadFile = ({onChange}) => {
    return (
        <>
            <DropzoneArea onChange={(e) => {onChange(e)}}
            />
        </>
    );
}
export default MBUploadFile;
