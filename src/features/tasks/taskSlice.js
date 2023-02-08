import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task 2 description",
    completed: true,
  },
];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const found = state.find((task) => task.id === action.payload.id);
      if (found) {
        found.title = action.payload.title;
        found.description = action.payload.description;
      }
    },
    deleteTask: (state, action) => {
      const found = state.find((task) => task.id === action.payload);
      if (found) {
        state.splice(state.indexOf(found), 1);
      }
    },
    toggleCompleted: (state, action) => {
      const found = state.find((task) => task.id === action.payload);
      if (found) {
        found.completed = !found.completed;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleCompleted } =
  taskSlice.actions;

export default taskSlice.reducer;
