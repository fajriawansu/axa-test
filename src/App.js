
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidemenu from "./components/Sidemenu";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./modules/dashboard/Dashboard";
import UserList from "./modules/user/UserList";
import UserDetail from "./modules/user/UserDetail";
import PostList from "./modules/post/PostList";
import PostDetail from "./modules/post/PostDetail";
import AlbumList from "./modules/album/AlbumList";
import AlbumDetail from "./modules/album/AlbumDetail";
import PostForm from "./modules/post/PostForm";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/albums/:id" element={<AlbumDetail />} />
      </Route>
    </Routes>
  );
}

function Root() {
  return (
    <div className="App">
      <Sidemenu />
      <Toaster />
      <Outlet />
    </div>
  );
}

export default App;
