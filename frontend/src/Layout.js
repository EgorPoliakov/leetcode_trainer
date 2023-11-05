import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function Layout() {
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const context = {
        messageContext: [message, setMessage],
        loadingContext: [isLoading, setIsLoading]
    }
    return (
        <div className='grid grid-rows-layout grid-cols-layout min-h-full'>
            <Outlet context={context}/>
        </div>
    );
}

export default Layout;