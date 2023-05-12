import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "mobx-react";
import { UserStore, RoomStore } from "./_stores";

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(
    <Provider RoomStore={RoomStore} UserStore={UserStore}>
      <App />
    </Provider>
  );
}
