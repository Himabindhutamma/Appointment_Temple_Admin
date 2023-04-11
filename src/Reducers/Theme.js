// let data={
//     themeid:'2',
//     themes:{
//         '1':{
//             '--backgroundcolor':'rgb(255,255,255)',
//             '--textcolor':'black'
//         },
//         '2':{
//             '--backgroundcolor': '#00331f',
//             '--textcolor':'red'
//         },
//         '3':{
//             '--backgroundcolor':'rgb(0, 191, 255)',
//             '--textcolor':'orange'
//         }
//     }
// };
// const Theme = ((state = data,action) => {
//         switch (action.type) {
//             case 'SET_THEME':
//                 console.log(action.payload);
//                 state = {...state,themeid:action.payload};
//                 localStorage.setItem("theme",JSON.stringify(state));
//                 break;
//             case 'LOAD_THEME_FROM_LOCAL':
//             state = {...action.payload};
//             localStorage.setItem("theme", JSON.stringify(state));
//             break;

//             default:
//                 break;
//         }
// })
// export default Theme
const data = {
  themeId: '2',
  themes: {
    1: {
      '--backgroundcolor': 'rgb(0, 191, 255)',
      '--textcolor': 'orange'
    },
    2: {
      '--backgroundcolor': '#00331f',
      '--textcolor': 'red'
    },
    3: {
      '--backgroundcolor': 'rgb(255,255,255)',
      '--textcolor': 'black'
    }
  }
};
const Theme = (state = data, action) => {
  switch (action.type) {
    case 'SET_THEME':
      state = { ...state, themeId: action.payload };
      localStorage.setItem('theme', JSON.stringify(state));
      break;

    case 'LOAD_THEME_FROM_LOCAL':
      state = { ...action.payload };
      localStorage.setItem('theme', JSON.stringify(state));
      break;
    default:
      break;
  }

  return state;
};

export default Theme;
