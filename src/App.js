import { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Delete } from "./component/destroy/Delete";
import EditContact from "./component/edit/EditContact";
import { ErrorPage } from "./component/error/ErrorPage";
import LandingPage from "./component/landingpage/LandingPage";
import { SideNavigation } from "./component/navbar/SideNavigation";
import { NewContact } from "./component/new/NewContact";
export const UserContext = createContext();
function App() {
  const [contactDetails, setContactDetails] = useState([]); //context state
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SideNavigation />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/landing",
          element: <LandingPage />,
        },
        {
          path: "/destroy",
          element: <Delete />,
        },
        {
          path: "/edit",
          element: <EditContact />,
        },
        {
          path: "/addContact",
          element: <NewContact />,
        },
      ],
    },
  ]);
  return (
    <UserContext.Provider value={{ contactDetails, setContactDetails }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
