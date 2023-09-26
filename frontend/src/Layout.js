import { Outlet } from 'react-router-dom';
import { Header, Footer } from './containers';

function Layout() {
    return (
        <div className='grid grid-rows-layout grid-cols-layout min-h-full'>
            <Header />
            <div className='flex flex-col justify-center items-center col-start-2 col-end-10'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;