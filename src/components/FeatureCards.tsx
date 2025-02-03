export default function FeatureCards() {
    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 text-white">
            <div className="p-10 border border-white/20 bg-gray-700/10 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-2">Chess logic</h2>
                <p className="text-sm">Legal moves are generated on both the frontend and backend to ensure that
                players can only make valid moves.</p>
            </div>

            <div className="p-10 border border-white/20 bg-gray-700/10 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-2">Authentication</h2>
                <p className="text-sm">User authentication is handled via JSON-Web-Tokens (JWT).</p>
            </div>

            <div className="p-10 border border-white/20 bg-gray-700/10 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-2">Server-Sent-Events</h2>
                <p className="text-sm">Updates are sent by the backend via Server-Sent-Events (SSE).</p>
            </div>

            <div className="p-10 border border-white/20 bg-gray-700/10 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-2">MongoDB</h2>
                <p className="text-sm">Users and games are saved in a MongoDB database.</p>
            </div>
        </div>
    );
}
