import { Routes, Route, Navigate } from 'react-router-dom'
import HomeOwner from '@/pages/Owner/Home'
import ShopRegister from '@/pages/Owner/ShopRegister'

const Owner = () =>{
    return (
        <Routes>
        <Route path="/" element={ <HomeOwner />} />
        <Route path="/my-shop" element={ <ShopRegister />} />
        {/* <Route path="/login" element={ <Navigate to={'/search'} />} />
        <Route path='/search/*' element={<Search />} />
        <Route path="*" element={<Notfound></Notfound>}/> */}
      </Routes>
    )
}

export default Owner