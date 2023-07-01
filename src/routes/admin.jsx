import { Routes, Route, Navigate } from 'react-router-dom'
import HomeAdmin from '@/pages/Admin/Home'
import ShopManage from '@/pages/Admin/ShopManage'

const Admin = () => {
  return (
    <Routes>
      {/* <Route path="*" element={<HomeAdmin />} /> */}
      <Route path="/"  element={<Navigate to={'/shop-manage'} />}  />
      <Route path="/shop-manage" element={<ShopManage />} />
      <Route path="/request-manage" element={<ShopManage />} />
      <Route path="/login" element={<Navigate to={'/shop-manage'} />} />

      {/* <Route path="/login" element={ <Navigate to={'/search'} />} />
        <Route path='/search/*' element={<Search />} />
        <Route path="*" element={<Notfound></Notfound>}/> */}
    </Routes>
  )
}

export default Admin