
import { Outlet, Route, Routes, createBrowserRouter } from "react-router-dom";
import "./App.css";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<div>INI Dashboard</div>} />
      </Route>
    </Routes>
  );
}

function Dashboard() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Outlet />
    </div>
  );
}

export default App;
