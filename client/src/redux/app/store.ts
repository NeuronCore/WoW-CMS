import logger from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import environmentReducer from '@/redux/features/environment/environment-slice';

const rootReducer = combineReducers(
    {
        environment: environmentReducer
    });

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production'
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
