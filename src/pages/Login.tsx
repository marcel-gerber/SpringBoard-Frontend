import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider.tsx";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/players/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if(response.ok) {
            login();
            navigate("/");
            return;
        }
        setErrorMessage("Invalid username or password");
    }

    return (
        <>
            <NavBar />

            <main className="pt-16">
                <div className="flex min-h-[80svh] items-center justify-center">
                    <div className="w-full max-w-md p-10 space-y-8 rounded-lg shadow-lg bg-gray-700/10 border border-white/30">
                        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username */}
                            <div>
                                <input
                                    id="username"
                                    placeholder="Username"
                                    type="text"
                                    required
                                    onChange={event => setUsername(event.target.value)}
                                    className="w-full mt-1 px-3 py-2 border border-white/30 rounded-lg bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    required
                                    onChange={event => setPassword(event.target.value)}
                                    className="w-full mt-1 px-3 py-2 border border-white/30 rounded-lg bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                                >
                                    Login
                                </button>
                                {errorMessage && (<p className="mt-2 pt-4 text-red-500">{errorMessage}</p>)}
                            </div>
                        </form>

                        {/* Signup Link */}
                        <p className="text-sm text-center text-gray-400">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-blue-500 hover:underline">
                                Create one here
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    );
}
