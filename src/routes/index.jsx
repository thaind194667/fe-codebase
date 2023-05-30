import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation,
  generatePath } from 'react-router-dom'
import User from './user'
import Admin from './admin'
import Owner from './owner'
import Login from '@/pages/Login'
// import Register from '@/pages/Register'

let type = localStorage.getItem("role");

const useNavigateParams = () => {
  const navigate = useNavigate();
  const curUrl = useLocation().pathname;

  return (url, params) =>  {
    const path = {
      url,
      queryString: params
    };
    navigate(path);
  };
};

const Router = () => {
  //   const type = localStorage.getItem('type')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          !type ? <Login></Login> : (type === "user" ? <User /> : type === "admin" ? <Admin /> : <Owner />)
        } />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router

export { useNavigateParams }