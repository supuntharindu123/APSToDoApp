import {} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskHomePage from "./pages/TaskHomePage";
function App() {
  const taskRoute = [
    {
      path: "/",
      element: <TaskHomePage />,
    },
  ];
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {taskRoute.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
