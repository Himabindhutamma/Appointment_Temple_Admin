
const data = {
  isLogin: true,
  "email_users": null,
  "name_users": null,
  "mobileNumber_users": null,
  "userId_users":null,
  "userTypeId_users":null,
};

const User = (state = data, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.payload);
      state = { ...state,
        isLogin:true,
        "email_users": action.payload.email_users,
        "name_users": action.payload.name_users,
        "mobileNumber_users": action.payload.mobileNumber_users,
        "userId_users": action.payload.userId_users,
        "userTypeId_users":action.payload.userTypeId_users
        };
      console.log(state);
      localStorage.setItem('login', JSON.stringify(state))
      break;
    case 'LOGOUT':
      state = { isLogin: false };
      localStorage.clear();
      break;

    default:
      break;
  }
  return state;
};
export default User;
