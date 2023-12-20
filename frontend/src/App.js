import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Home, Decks, Cards, About, DeckTable } from './pages';
import './App.css'
import Layout from './Layout';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/decks' element={<Decks />} />
      <Route path='/study' element={<Cards />} />
      <Route path='/about' element={<About />} />
      <Route path='/deck_table' element={<DeckTable />} />
    </Route>
  )
);

function App() {
  
  return (
    <GoogleOAuthProvider clientId='406378347404-c1t9om3k24eol4evt1klfaf54vdhqp2n.apps.googleusercontent.com'>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  );
}

export default App;