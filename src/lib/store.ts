import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import searchReducer from "./slices/search-slice";
import albumReducer from "./slices/album-slice";
import playerReducer from "./slices/player-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
      album: albumReducer,
      player: playerReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
