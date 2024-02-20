import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        selectedGroup: null,
        groups: []
    },
    reducers: {
        changeSelectedGroup: (state, action) => {
            state.selectedGroup = action.payload;
        },
        changeGroups: (state, action) => {
            state.groups = action.payload;
        },
        addGroup: (state, action) => {
            state.groups = [...state.groups, action.payload];
        },
        removeGroup: (state, action) => {
            state.groups = state.groups.filter(group => group._id !== action.payload._id);
        },
        resetGroupState: (state) => {
            state.selectedGroup = null;
            state.groups = []
        }
    }
});

export const { changeSelectedGroup, changeGroups, addGroup, removeGroup, resetGroupState } = groupSlice.actions;

export default groupSlice.reducer;