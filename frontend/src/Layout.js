import { Outlet } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { Header, Footer } from './containers';

function Layout() {
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const setMessageHandler = useCallback((message) => {
        setMessage(message);
    }, []);

    const setLoadingHandler = useCallback((isLoading) => {
        setIsLoading(isLoading);
    }, []);

    const messageContext = useMemo(() => [message, setMessageHandler], [message, setMessageHandler]);
    const loadingContext = useMemo(() => [isLoading, setLoadingHandler], [isLoading, setLoadingHandler]);

    const context = useMemo(() => ({
    messageContext,
    loadingContext
    }), [messageContext, loadingContext]);
   
    return (
        <div className='grid grid-rows-layout grid-cols-layout min-h-full'>
            <Header setMessageHandler={setMessageHandler}/>
                <Outlet context={context}/>
            <Footer />
        </div>
    );
}

export default Layout;