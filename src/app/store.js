import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});
