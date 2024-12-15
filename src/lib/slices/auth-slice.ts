import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Img {
  height: number;
  url: string;
}

interface User {
  country?: string;
  display_name?: string;
  email?: string;
  external_urls?: {
    spotify: string;
  };
  images?: Img[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
