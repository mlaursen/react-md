import { Routes as BaseRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events/Events';
import Event from './pages/Events/Event';
import Admin from './pages/Admin';
import Metaverse from './pages/Metaverse';

export default function Routes(props) {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="events">
        <Route index element={<Events campaigns={props.campaigns} />} />
        <Route
          path=":eventId"
          element={<Event user={props.user} campaigns={props.campaigns} />}
        />
      </Route>
      <Route path="admin" element={<Admin />} />
      <Route path="metaverse" element={<Metaverse />} />
    </BaseRoutes>
  );
}
