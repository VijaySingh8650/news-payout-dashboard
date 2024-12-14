import { TypeOfArticleRate } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type TyoeOfInitialState =  {
  type: "admin" | "user";
  email: string;
  password: string;
  buyArticles: TypeOfArticleRate[];
}

const initialState: TyoeOfInitialState = {
  type: "user",
  email: "",
  password: "",
  buyArticles: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) =>{

        return {
          ...state,
          type: action.payload.email === "admin@sportsduniya.com" ? "admin" : "user",
          email: action.payload.email,
          password: action.payload.password,
          buyArticles: JSON.parse(localStorage.getItem("buyArticles") as string) || [],
        };

    },
    addArticleToBuy: (state, action) => {
     
      localStorage.setItem("buyArticles", JSON.stringify([...state.buyArticles, action.payload]));
      return {
        ...state,
        buyArticles: [...state.buyArticles, action.payload]
      }
    }
  },
});

export const { updateUser, addArticleToBuy } = userSlice.actions;
export default userSlice.reducer;
