import "./App.css";
import GameBoard from "./components/Game/GameBoard";
import ScoreBoard from "./components/Game/ScoreBoard";

function App() {
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <ScoreBoard />
      <GameBoard height={600} width={1000} />
    </div>
  );
}

export default App;
