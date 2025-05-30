import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isloggedIn: boolean;
  user: string;
}

const initialState: AuthState = {
  isloggedIn: false,
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggin(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      state.isloggedIn = false;
    },
    adduser(state, action) {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
