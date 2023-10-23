import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function Layout() {
    const [message, setMessage] = useState();
    return (
        <div className='grid grid-rows-layout grid-cols-layout min-h-full'>
            <Outlet context={[message, setMessage]}/>
        </div>
    );
}

export default Layout;