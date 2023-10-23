import { createSlice } from '@reduxjs/toolkit';

const initialState= Array(9).fill({ status: 'free', startTime: null });// 9 seats, all free by default

// Slice(handle the state of the seats)
const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        selectSeat: (state, action) => {
            state[action.payload] = 'pending';
        },
        setSeatStatus: (state, action) => {
            const { index, status, startTime } = action.payload;
            state[index].status = status;
            if (startTime) {
                state[index].startTime = startTime;
            }
        },
    },
});

export const { selectSeat, setSeatStatus } = seatsSlice.actions;
export default seatsSlice.reducer;
