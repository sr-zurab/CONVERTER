import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
const API_URL = 'http://127.0.0.1:8000/api/organizations/';

export const fetchFhd = createAsyncThunk('fhd/fetch', async () => {
  const res = await fetch(API_URL);
  return await res.json();
});
