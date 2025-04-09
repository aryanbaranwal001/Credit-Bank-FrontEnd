// App.jsx - Main application file
import Navbar from "./pages/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "./context/Web3Context.jsx";
import "./additional.css";
function App() {
  return (
    <Web3Provider>
      <Toaster
        toastOptions={{
          duration: 1000, // applies to all toasts unless overridden
        }}
      />
      <Navbar />
    </Web3Provider>
  );
}

export default App;
