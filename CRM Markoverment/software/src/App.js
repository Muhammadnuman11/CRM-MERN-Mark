import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from "../src/pages/Routes"
import { ToastContainer } from 'react-toastify';
// import ScreenLoader from './components/ScreenLoader';
// import { AuthContext } from "./pages/Context/AuthContext"
// import { useContext } from 'react';

function App() {

  // const { isAppLoading } = useContext(AuthContext)

  // if (isAppLoading)
  // return <ScreenLoader />

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;

