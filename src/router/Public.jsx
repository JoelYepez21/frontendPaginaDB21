import { Route, Routes } from "react-router";
import Home from "../pages/home";
import Verify from "../pages/verify";
import PersisAuth from "../components/PersistAuth";

export const RootPublic = () => {
  return (
    <>
      <Routes>
        <Route element={<PersisAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/verify/:id/:token" element={<Verify />} />
      </Routes>
    </>
  );
};

export default RootPublic;
