import {HashRouter,Route,Routes} from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import DeletePost from './pages/DeletePost'
import './index.css'
export default function App() {
  return (
    <HashRouter>
<Routes>
<Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<PostPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/:id/update" element={<EditPage />} />
          <Route path="/:id/delete" element={<DeletePost />} />
          <Route path="*" element={<NotFound />} />

</Route>
</Routes>
    </HashRouter>
  )
}
