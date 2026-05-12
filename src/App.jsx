import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import SenderPage from "./pages/SenderPage";
import ReceiverPage from "./pages/ReceiverPage";

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-[#0f172a] text-white">

        {/* NAVBAR */}

        <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-700">

          <h1 className="text-3xl font-bold text-cyan-400">
            GPS Tracker
          </h1>

          <div className="flex gap-5">

            <Link
              to="/sender"
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl"
            >
              Sender
            </Link>

            <Link
              to="/receiver"
              className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl"
            >
              Receiver
            </Link>

          </div>

        </nav>

        {/* ROUTES */}

        <Routes>

          <Route
            path="/"
            element={<SenderPage />}
          />

          <Route
            path="/sender"
            element={<SenderPage />}
          />

          <Route
            path="/receiver"
            element={<ReceiverPage />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;