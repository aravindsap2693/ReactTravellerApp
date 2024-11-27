import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Provider from react-redux
import AppRoutes from "./Route/route";
import 'rsuite/dist/rsuite.min.css';
import { store } from "./Store/store";


function App() {
  return (
    <Provider store={store}> {/* Wrap the entire app with Provider */}
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
