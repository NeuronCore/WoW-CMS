import { createSlice } from '@reduxjs/toolkit';

const initialState =
    {
        theme: 'cataclysm'
    };

const environmentSlice = createSlice(
    {
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
