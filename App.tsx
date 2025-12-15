import './App.css';
import HeaderSection from './components/header-section.tsx';
import SearchSection from './components/search-section.tsx';
import MainSection from './components/main-section.tsx';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <div className="App">  
        <HeaderSection />
        <h1 className='title-h1'>How's the sky looking today?</h1>
        <SearchSection />
        <MainSection />
        <footer></footer>
      </div>
    </WeatherProvider>
  )
}

export default App
