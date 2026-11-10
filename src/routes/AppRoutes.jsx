import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home/Home';
import WordDetails from '@/pages/WordDetails/WordDetails';
import Favorites from '@/pages/Favorites/Favorites';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/word/:word" element={<WordDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<h1 style={{ padding: 40 }}>404 — Not Found</h1>} />
      </Route>
    </Routes>
  );
}
