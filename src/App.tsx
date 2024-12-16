import "./styles/App.css";
import Home from "./pages/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/./Signup.tsx";
import Login from "./pages/Login.tsx";
import Games from "./pages/Games.tsx";
import {AuthProvider} from "./services/AuthProvider.tsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/games" element={<Games />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
