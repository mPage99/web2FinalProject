import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./views/home";
import TeamsPage from "./views/teams";
import EventsPage from "./views/events";
import PlayersPage from "./views/players";
import TournamentBrackets from "./views/brackets";
import NewsAnnouncements from "./views/news";
import MediaGallery from "./views/gallery";

import NoMatch from "./components/default";
import Layout from "./components/layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout title="Utah Skiing League" logo="fas fa-person-skiing" />}>
          <Route index element={<HomePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/brackets" element={<TournamentBrackets />} />
          <Route path="/news" element={<NewsAnnouncements />} />
          <Route path="/gallery" element={<MediaGallery />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
