import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserInfo {
    uuid?: string;
    name?: string | null;
    email: string | null;
    password?: string | null;
    profileImage?: string | null;
}

export interface UserState {
    userInfo: UserInfo | null;
}

const initialState: UserState = {
    userInfo: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        logOut: (state) => {
            state.userInfo = null;
        },
        editUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = { ...state.userInfo,...action.payload};
        }
    }
});

export const { addUser, logOut,editUser} = userSlice.actions;
export default userSlice.reducer;