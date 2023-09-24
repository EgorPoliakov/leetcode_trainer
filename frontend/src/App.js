import './App.css';
import { Header, Footer } from './containers';

function App() {
  return (
    <div className='grid grid-rows-3 grid-cols-layout'>
      <Header />
      <div className='bg-blue-600 col-start-2 col-end-10'>
        Main section
      </div>
      <Footer />
    </div>
  );
}

export default App;