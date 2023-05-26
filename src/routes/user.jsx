import { Routes, Route, Navigate } from 'react-router-dom'

// import * as Notfound from '@/Pages/Error'
import Search from '@/pages/User/Search'
import Home from '@/pages/User/Home'

const User = () =>{
    return (
        <Routes>
        <Route path="/" element={ <Search />} />
        <Route path="/login" element={ <Navigate to={'/search'} />} />
        <Route path='/search/*' element={<Search />} />
        {/* <Route path="*" element={<Notfound></Notfound>}/> */}
      </Routes>
    )
}

export default User