import { Routes, Route, Navigate } from 'react-router-dom'
import ShopRegister from '@/pages/Owner/ShopRegister'
// import * as Notfound from '@/Pages/Error'
import Search from '@/pages/User/Search'
import HomeUser from '@/pages/User/Home'
import Detail from '@/pages/User/Detail'

const User = () =>{
    return (
        <Routes>
        <Route path="/" element={ <Search />} />
        <Route path="/login" element={ <Navigate to={'/'} />} />
        {/* <Route path='/search' element={<Search />} /> */}
        <Route path="/my-shop" element={ <ShopRegister />} />
        {/* <Route path='/detail/:id' element={<Detail />} /> */}
        {/* <Route path="*" element={<Notfound></Notfound>}/> */}
      </Routes>
    )
}

export default User