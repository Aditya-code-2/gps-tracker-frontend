import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import { motion } from "framer-motion";

import SenderPage from "./pages/SenderPage";
import ReceiverPage from "./pages/ReceiverPage";

function Navbar() {

  const location = useLocation();

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-5 flex items-center justify-between">

        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl sm:text-3xl font-bold tracking-wide"
        >

          <span className="text-cyan-400">
            GPS
          </span>

          <span className="text-white">
            Tracker
          </span>

        </motion.h1>

        {/* NAV LINKS */}
        <div className="flex items-center gap-3 sm:gap-5">

          <Link
            to="/sender"
            className={`px-5 py-3 rounded-2xl text-sm sm:text-base font-medium duration-300 border
              
              ${
                location.pathname === "/sender" || location.pathname === "/"
                  ? "bg-cyan-400 text-black border-cyan-400 shadow-lg shadow-cyan-500/30"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
              
            `}
          >

            Sender

          </Link>

          <Link
            to="/receiver"
            className={`px-5 py-3 rounded-2xl text-sm sm:text-base font-medium duration-300 border
              
              ${
                location.pathname === "/receiver"
                  ? "bg-green-400 text-black border-green-400 shadow-lg shadow-green-500/30"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
              
            `}
          >

            Receiver

          </Link>

        </div>

      </div>

    </nav>

  );

}

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-black text-white overflow-hidden relative">

        {/* BACKGROUND BLUR */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full"></div>

        {/* NAVBAR */}
        <Navbar />

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