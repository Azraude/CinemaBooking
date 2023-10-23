import { configureStore } from '@reduxjs/toolkit';
import seatsReducer from './seatsSlice';
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cinema_seats', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cinema_seats');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

const persistedState = loadState();

const store = configureStore({
    reducer: {
        seats: seatsReducer,
    },
    preloadedState: persistedState,
});
store.subscribe(() => {
    saveState({
        seats: store.getState().seats
    });
});

export default store;

