import CharacterDetails from "./components/CharacterDetails";
import LegendsCard from "./components/LegendsCard";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LegendsCard/>}/>
        <Route path='/character/:id' element={<CharacterDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
