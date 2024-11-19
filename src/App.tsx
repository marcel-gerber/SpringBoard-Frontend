import "./styles/App.css";
import Chessboard from "./components/Chessboard.tsx";

function App() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Chessboard />
        </div>
    );
}

export default App;
