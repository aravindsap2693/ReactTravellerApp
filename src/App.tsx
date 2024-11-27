import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Provider from react-redux
import AppRoutes from "./Route/route";
import 'rsuite/dist/rsuite.min.css';
import store ,{ persistor} from "./Store/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}> {/* Wrap the entire app with Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Ensures Redux store persistence */}
        <Router>
          <AppRoutes /> {/* Your app routes */}
        </Router>
        <ToastContainer // Toast notifications, can be placed anywhere as long as it's inside Provider */}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  );
}

export default App;
