import React from "react";
import RoutesPage from "./routes/Routes";
import FetchDetails from "./pages/FetchDetails";
import { ToastContainer } from "react-toastify";

const App = () => {
  

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={1000}
      />
      <FetchDetails />
      <RoutesPage />
    </>
  );
};

export default App;
