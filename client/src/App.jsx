import { Route , Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./Components/IndexPage";
import LoginPage from "./Components/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./Components/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./Components/ProfilePage";
import PlacesPage from "./Components/PlacesPage";
import PlacesFormPage from "./Components/PlacesFormPage";
import PlaceInfoPage from "./Components/PlaceInfoPage";
import BookingsPage from "./Components/BookingsPage";
import BookingPage from "./Components/BookingPage";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL="http://localhost:4100"
// when we want to send cookies to different hosts , we use below
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlaceInfoPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/booking/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
