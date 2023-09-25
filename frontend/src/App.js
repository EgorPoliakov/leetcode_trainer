import './App.css';
import { Header, Footer, Cards } from './containers';

function App() {
  return (
    <div className='grid grid-rows-3 grid-cols-layout'>
      <Header />
      <div className='flex place-content-center col-start-2 col-end-10'>
        <Cards />
      </div>
      <Footer />
    </div>
  );
}

export default App;