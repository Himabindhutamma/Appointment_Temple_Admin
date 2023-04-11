import React from 'react';
import './App.css';
// import antena from './antena.png';
import bag from './bag.gif';

const Animation = () => {
    return (
        <body id="animation">
            <div>
                <ul class="bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>

                    <div class="scene">
                        <div class="upper">
                             {/* <img class="object van move-right" src={antena} width="100px" height="100px" /> */}
                            <div class="cloud1">
                                <img class="object van move-right" src={bag} width="100px" height="100px" />
                                {/* <div class="circle"></div>
                        <div class="filler"></div> */}
                            </div>
                            <div class="cloud2">
                                {/* <div class="circle"></div>
                        <div class="filler"></div> */}
                                <img class="object van move-right" src={bag} width="100px" height="100px" />
                            </div>

                            {/* <img style={{position:'absolute',top:'500px'}} class="object van move-right" src={antena} width="100px" height="100px" /> */}

                        </div>
                        {/* <div class="lower">
                                <img class="object van move-right" src="https://i.stack.imgur.com/qgNyF.png?s=328&g=1" width="100px" height="100px" />
                        </div> */}
                    </div>
                </ul>
            </div>
        </body>


    )
}
export default Animation