import React, { useState, useEffect } from 'react'
import { useFileUpload } from 'use-file-upload'
import MBFormButton from '../../FunctionalComponents/MBFormButton/MBFormButton'
import MBForm from '../../FunctionalComponents/MBForm/MBForm'
import MBTextField from '../../FunctionalComponents/MBTextField/MBTextField'
import axios from 'axios'
import { AlertTypes, ReducerTypes } from '../../Assets/Constants'
import Store from '../../Store'



const UploadImage = ({ getData, banner }) => {
  const [files, selectFiles] = useFileUpload()
  const [profile, setProfile] = useState('')
  const [heading, setHeading] = useState('')
  const [valid, setValid] = useState(false)
  const [img, setImg] = useState();
  console.log(banner)
  useEffect(() => {
    getData()
    fetchImage()
  }, [])
  const fetchImage = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}GetFile/${banner.profilePath}`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  const uploadImg = e => {
    e.preventDefault()
    var formdata = new FormData()
    formdata.append('images', files.file, 'bannerlogo.jpg')

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    fetch(`${process.env.REACT_APP_API_URL}Upload_files/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        formSubmit(result.Message[0].filename)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  const formSubmit = profilePath => {
    let data1 = {
      heading: heading,
      profilePath: profilePath
    }
    console.log(data1)
    let data = {
      staticPageId_staticPages: null,
      name_staticPages: 'New-Banner1',
      content_staticPages: JSON.stringify(data1),
      createdDate_staticPages: ' ',
      updatedDate_staticPages: ' '
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}InsertWithParent_staticPages`, data)
      .then(res => {
        console.log(res.data.Message)
        Store.dispatch({
          type: ReducerTypes.SHOW_ALERT.toString(),
          payload: {
            showAlert: true,
            message: `Banner Added Successfully!`,
            type: AlertTypes.SUCCESS_ALERT_TYPE
          }
        })
      })
  }
  return (
    <>
      <MBForm onSubmit={uploadImg}>
        <MBTextField
          fullWidth
          id={'heading'}
          name={'heading'}
          value={heading}
          key={'heading'}
          label={'Heading'}
          required={true}
          error
          validate={valid}
          onChange={e => {
            setHeading(e.target.value)
          }}
        />
      </MBForm>
      <img src={img} alt="icons" />
      <div>Upload Image</div>

      <div className=''>
        <img src={files?.source} alt='preview' />
        <MBFormButton
          className='upload-button'
          type='button'
          onClick={() =>
            selectFiles(
              { accept: 'image/*' },
              ({ name, size, source, file }) => {
                //   let setdata = {name, size, source, file}
                //   setProfile(setdata);
              }
            )
          }
        >
          Upload
        </MBFormButton>
      </div>
      <MBFormButton
        onClick={uploadImg}
        type={'submit'}
        variant='contained'
        fullWidth={false}
      >
        Submit
      </MBFormButton>
    </>
  )
}
export default UploadImage
