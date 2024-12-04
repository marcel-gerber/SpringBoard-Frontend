import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";

export default function Signup() {
    return (
        <>
            <NavBar />

            <main className="pt-16">
                <div className="flex min-h-screen items-center justify-center px-6">
                    <div
                        className="w-full max-w-md p-10 space-y-6 rounded-lg shadow-lg bg-gray-700/10 border border-white/30">
                        <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>
                        <form className="space-y-4">
                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="w-full mt-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full mt-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        {/* Signup Link */}
                        <p className="text-sm text-center text-gray-400">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Log in here
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    );
}
