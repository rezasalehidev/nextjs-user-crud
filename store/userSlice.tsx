import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}


export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  totalPages: 1,
};

//  fetching users with pagination
export const fetchUsers = createAsyncThunk<{ users: User[], totalPages: number }, number>('users/fetchUsers', async (page) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return { users: response.data.data, totalPages: response.data.total_pages };
});

//  deleting a user
export const deleteUserById = createAsyncThunk<void, number>('users/deleteUser', async (id) => {
  await axios.delete(`https://reqres.in/api/users/${id}`);
});

//  adding a new user
export const addUser = createAsyncThunk<User, Partial<User>>(
  'users/addUser',
  async (newUser) => {
    const response = await axios.post('https://reqres.in/api/users', newUser);
    return response.data;
  }
);

// update an existing user
export const updateUserById = createAsyncThunk<User, User>(
  'users/updateUser',
  async (updatedUser) => {
    const response = await axios.put(`https://reqres.in/api/users/${updatedUser.id}`, updatedUser);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add user';
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ users: User[], totalPages: number }>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

export default userSlice.reducer;
