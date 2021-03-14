import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import ListMenuScreen from "./screens/ListMenuScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/" component={ListMenuScreen} exact />
        </Container>
      </Router>
    </>
  );
}

export default App;
