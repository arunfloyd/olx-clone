import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import CreateSell from "./CreateSell";
import Browse from "./Browse";
import DetailPage from "./DetailPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/sell",
      element: <CreateSell />,
    },
    {
      path: "/detail/:id",
      element: <DetailPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
