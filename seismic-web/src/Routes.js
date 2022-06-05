import { Routes as BaseRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events/Events';
import Event from './pages/Events/Event';
import Admin from './pages/Admin';
import Metaverse from './pages/Metaverse';

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="events">
        <Route index element={<Events />} />
        <Route path=":eventId" element={<Event />} />
      </Route>
      <Route path="admin" element={<Admin />} />
      <Route path="metaverse" element={<Metaverse />} />
    </BaseRoutes>
  );
}
