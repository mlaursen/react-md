import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Route1 from './components/Route1';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="route-1" element={<Route1 />} />
      </Routes>
    </Layout>
  );
}
