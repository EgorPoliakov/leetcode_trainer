import './App.css';
import { Header, Footer } from './containers';
import { Card } from './components';

function App() {
  return (
    <div className='grid grid-rows-3 grid-cols-layout'>
      <Header />
      <div className='flex place-content-center col-start-2 col-end-10'>
        <Card 
          questionName={'Question 1'}
          questionUrl={'Some url'}
          questionDifficulty={'Hard'}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;