import { createSlice } from '@reduxjs/toolkit';

const initialState =
{
    theme: 'wotlk'
};

const environmentSlice = createSlice
({
    name: 'environment',
    initialState,
    reducers:
    {
        setTheme(state, action)
        {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = environmentSlice.actions;
export default environmentSlice.reducer;
