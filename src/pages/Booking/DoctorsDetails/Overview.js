import React from 'react'
import { Box } from '@mui/material'

const OverView = () => {
  return (
    <>
      <Box className='doc-overview'>
        <h4>About Me</h4>
        <p className='about-doc'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Box className='doc-education'>
          <h4>Education</h4>
          <Box className='doc-edu-list'>
            <ul>
              <li>
                <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>American Dental Medical University</p>
                  <div>BDS</div>
                  <span>1998-2003</span>
                </div>
              </li>
              <li>
              <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>American Dental Medical University</p>
                  <div>BDS</div>
                  <span>1998-2003</span>
                </div>
              </li>
            </ul>
          </Box>
        </Box>
        <Box className='doc-education'>
          <h4>Work & Experience</h4>
          <Box className='doc-edu-list'>
            <ul>
              <li>
                <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>Glowing Smiles Family Dental Clinic</p>
                  <span>2010 - Present (5 years)</span>
                </div>
              </li>
              <li>
              <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>Comfort Care Dental Clinic</p>
                  <span>2010 - 2021</span>
                </div>
              </li>
              <li>
              <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>Dream Smile Dental Practice</p>
                  <span>2010 - 2021</span>
                </div>
              </li>
            </ul>
          </Box>
        </Box>
        <Box className='doc-education'>
          <h4>Awards</h4>
          <Box className='doc-edu-list'>
            <ul>
              <li>
                <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>July 2019</p>
                  <span>Humanitarian Award</span>
                </div>
              </li>
              <li>
              <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>March 2011</p>
                  <span>Certificate for International Volunteer Service</span>
                </div>
              </li>
              <li>
              <div class='experience-user'>
                  <div class='before-circle'></div>
                </div>
                <div>
                  <p>May 2008</p>
                  <span>The Dental Professional of The Year Award   </span>
                </div>
              </li>
            </ul>
          </Box>
        </Box>
        <Box className='services-list'>
            <h4>Services</h4>
            <ul>
                <li>Tooth cleaning</li>
                <li>Root Canal Therapy</li>
                <li>Implants</li>
                <li>Composite Bonding</li>
                <li>Fissure Sealants</li>
            </ul>
        </Box>
        <Box className='services-list'>
            <h4>Specializations</h4>
            <ul>
                <li>Children Care</li>
                <li>Dental Care</li>
                <li>Oral and Maxillofacial Surgery</li>
                <li>Orthodontist</li>
                <li>Periodontist</li>
                <li>Prosthodontics</li>
            </ul>
        </Box>
      </Box>
    </>
  )
}
export default OverView
