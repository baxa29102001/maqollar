import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import MainHeader from "components/UI/MainHeader";
import Quotes from "pages/Quotes";
import Container from "components/Layouts/Container";
import Login from "pages/Login";
import ProtectedRoutes from "pages/ProtectedRoutes";
import NewQuote from "pages/NewQuote";
import SingleQuote from "pages/SingleQuote";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLogged);

  return (
    <Fragment>
      <header>
        <MainHeader />
      </header>
      <main>
        <Container>
          <Switch>
            <Route path="/" exact>
              <h2>Hi</h2>
            </Route>

            <Route path="/quotes" exact>
              <Quotes />
            </Route>
            <Route path="/quotes/:id" exact>
              <SingleQuote />
            </Route>
            <ProtectedRoutes exact path="/new-quote" component={NewQuote} />

            {!isLoggedIn && (
              <Route path="/login" exact>
                <Login />
              </Route>
            )}

            <Route>
              <h2>Hech narsa topilmadi</h2>
            </Route>
          </Switch>
        </Container>
      </main>
    </Fragment>
  );
}

export default App;
