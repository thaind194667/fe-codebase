import { Routes, Route, Navigate } from 'react-router-dom'

// import * as Notfound from '@/Pages/Error'
import Search from '@/pages/User/Search'
import HomeUser from '@/pages/User/Home'
import Detail from '@/pages/User/Detail'

const User = () =>{
    return (
        <Routes>
        <Route path="/" element={ <HomeUser />} />
        <Route path="/login" element={ <Navigate to={'/search'} />} />
        <Route path='/search' element={<Search />} />
        <Route path='/detail/:id' element={<Detail />} />
        {/* <Route path="*" element={<Notfound></Notfound>}/> */}
      </Routes>
    )
}

export default User