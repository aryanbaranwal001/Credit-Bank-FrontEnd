// App.jsx - Main application file
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3Provider } from "./context/Web3Context.jsx";

function App() {
  return (
    <Router>
      <Web3Provider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
      </Web3Provider>
    </Router>
  );
}

export default App;