import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Stack, Grid, Box } from "@mui/material";
import MBForm from "../../FunctionalComponents/MBForm/MBForm";
import MBDatePicker from "../../FunctionalComponents/MBDatePicker/MBDatePicker";
import MBFormButton from "../../FunctionalComponents/MBFormButton/MBFormButton";
import Axios from '../../Services/API';

const ContentStyle = styled("div")(({ theme }) => ({
  // maxWidth: 580,
  padding: "25px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  // padding: theme.spacing(12, 0),
}));
const AvailableTimings = () => {
  const [date, setDate] = useState(new Date().toISOString().substring(0,10));
  const [valid, setValid] = useState(false);
  console.log(date);
  const [doctorslot,setDoctorslot]=useState([])
  
// useEffect(()=>{
//   userSlot();
// },[])
  const saveTimings = (e) => {
    e.preventDefault();
  };

  const userSlot=()=>{
    let data={'date_userSlots':date}
    Axios.postData('SelectConditionWithParent_userSlots',data).then(res=>{
      console.log(res)
      setDoctorslot(res.Message)
    })
  }
  return (
    <>
      <Paper elevation={0}>
        <ContentStyle>
          <MBForm onSubmit={saveTimings}>
          <div className="avl-grid">
           <MBDatePicker
                  className={"date-picker"}
                  id={"date"}
                  name={"date"}
                  value={date}
                  key={"date"}
                  label={"Date"}
                  required={false}
                  error
                  helperText={""}
                  validate={valid}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <MBFormButton
                  className="search-btn"
                  type="button"
                  fullWidth={false}
                  variant="contained"
                  onClick={userSlot}
                >
                  Search
                </MBFormButton>
                </div>
            {/* <h4>Schedule Timings</h4> */}
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid item xs={12} sm={6} md={6} className="avl-grid">
                {/* <span className="date-section">Date:</span> */}
               
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <div className="text-center">
                  <h3>Session</h3>
                </div>
                <div style={{ display: "flex" }}>
                  {doctorslot && doctorslot.map((i, j) => {
                    return (
                      <div className="form-check-inline visits me-0">
                        <label className="visit-btns">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value="18"
                          />
                          <span
                            className="visit-rsn"
                            data-bs-toggle="tooltip"
                            title=""
                            data-bs-original-title="02:40 PM"
                          >
                            <span>{i.time_userSlots}</span>
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </MBForm>
        </ContentStyle>
      </Paper>
    </>
  );
};
export default AvailableTimings;
