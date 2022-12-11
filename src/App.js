import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import List from "./pages/List/List";
import Single from "./pages/Single/Single";
import New from "./pages/New/New";
import NewHotel from "./pages/newHotel/NewHotel";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { hotelInputs, userInputs } from "./FormSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, userColumns } from "./Datatablesource";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  

  const ProtectedRoute = ({children}) =>{
    const { user } = useContext(AuthContext)

    if(!user) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
            <Route index element={
            <ProtectedRoute>
              <Home />            
            </ProtectedRoute>
          } />
            <Route path="users">
              <Route index element={
                <ProtectedRoute>
              <List columns={userColumns} />
              </ProtectedRoute>
            } />

              <Route path=":userId" element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            } />
              <Route
                path="new"
                element={<ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                  }
              />
            </Route>
            <Route path="hotels">
              <Route index element={
              <ProtectedRoute>
                <List columns={hotelColumns} />
                </ProtectedRoute>
              } />
              <Route path=":productId" element={
              <ProtectedRoute>
                <Single />
                </ProtectedRoute>
              } />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                  }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

