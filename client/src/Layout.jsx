
import { Outlet } from 'react-router-dom'
import Header from './Header'
// import Footer from './Components/Footer'

const Layout = () => {
  return (
    <>
    <div className='px-20 mb-60 flex flex-col min-h-screen'>
        <Header />
        <Outlet />
    </div>
    </>

  )
}

export default Layout