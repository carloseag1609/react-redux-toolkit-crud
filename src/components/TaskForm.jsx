import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const isTaskEmpty = useMemo(
    () =>
      task.title.trim().length === 0 && task.description.trim().length === 0,
    [task]
  );

  const handleChange = ({ target }) => {
    setTask({
      ...task,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isTaskEmpty) return;
    if (taskId) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask({ ...task, id: uuid() }));
    }
    navigate("/");
  };

  useEffect(() => {
    if (taskId) {
      const found = tasks.find((task) => task.id === taskId);
      setTask(found);
    }
  }, []);

  return (
    <>
      {taskId && <h1>Editing task {taskId}</h1>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-neutral-800 p-4 rounded-md"
      >
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title:
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            name="title"
            onChange={handleChange}
            value={task.title}
            className="px-3 py-1.5 rounded-sm bg-neutral-600"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
            value={task.description}
            className="px-3 py-1.5 rounded-sm bg-neutral-600"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-2 py-1 rounded-md"
        >
          Save
        </button>
      </form>
    </>
  );
};
