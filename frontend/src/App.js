import './App.css';
import { Header, Footer, Cards } from './containers';

function App() {
  return (
    <div className='grid grid-rows-layout grid-cols-layout min-h-full'>
      <Header />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;