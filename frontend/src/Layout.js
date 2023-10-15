import { Outlet } from 'react-router-dom';
import { Header, Footer } from './containers';

function Layout() {
    return (
        <div className='grid grid-rows-layout grid-cols-layout min-h-full'>
            <Outlet />
        </div>
    );
}

export default Layout;