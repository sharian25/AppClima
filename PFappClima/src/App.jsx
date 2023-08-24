
import './App.css'
import HistoryWheathe from './components/HistoryWheathe'
import PlaceWheather from './components/PlaceWheather'

console.log (import.meta.env.VITE_APIKEY);
function App() {
  
  return (
    <>
    <PlaceWheather/>
    <HistoryWheathe/>
    </>
  )
}

export default App
