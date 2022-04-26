import './App.scss';
import { GenreList } from './component/genreList/GenreList';
import Header from './component/header/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MovieList } from './component/movieList/MovieList';
import { MovieDetails } from './component/movieDetails/MovieDetails';
import { ContextProvider } from './contexts/context';

function App() {
  return (
    <Router>
      <ContextProvider>
        <div className="App">
          <header className='main-header'>
            <Header />
          </header>
          <section className='main-section'>

            <Routes>
              <Route path='/' element={<GenreList />} />
              <Route path='/genre/:genreId' element={<MovieList />} />
              <Route path='/movie/:movieId' element={<MovieDetails />} />
            </Routes>
          </section>
        </div>
      </ContextProvider>
    </Router>


  );
}

export default App;
