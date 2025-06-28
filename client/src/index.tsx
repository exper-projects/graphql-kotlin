import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import {
  createClient,
  Provider as UrqlProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

const container = document.getElementById("root")!;
const root = createRoot(container);

const client = createClient({
  url: "http://localhost:8080/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

root.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <Provider store={store} children={<App />} />
    </UrqlProvider>
  </React.StrictMode>
);
