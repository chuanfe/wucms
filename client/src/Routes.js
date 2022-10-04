import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { Home, About } from "./pages/home";
import { MenuCreate } from "./pages/console";

import { HomeMenus, ConsoleMenus } from "./components/headers";

export default function Basic() {
  const widthHomeMenu = (WrappedComponent) => (
    <React.Fragment>
      <HomeMenus />
      <WrappedComponent />
    </React.Fragment>
  )
  const widthConsoleMenu = (WrappedComponent) => (
    <React.Fragment>
      <ConsoleMenus />
      <WrappedComponent />
    </React.Fragment>
  )
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={widthHomeMenu(Home)} />
        <Route path="/about" element={widthHomeMenu(About)} />
        <Route path="/console" element={<ConsoleMenus />}>
          <Route path="/console/menus/create" element={<MenuCreate />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
