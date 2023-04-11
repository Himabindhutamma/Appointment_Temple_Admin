import Loadable from 'react-loadable';
// import Loading from './my-loading-component';
import SignIn from "./pages/SignIn/SignIn";
export const SignIn = Loadable({
    loader: () => import('./pages/SignIn/SignIn'),
    loading: null,
});
