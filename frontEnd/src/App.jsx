// App.jsx - Main application file
import Navbar from "./pages/Navbar.jsx";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import { Web3Provider } from "./context/Web3Context.jsx";
import "./additional.css";
function App() {
  return (
      <Web3Provider>
        <Toaster />
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        <Navbar />
      </Web3Provider>
  );
}

export default App;