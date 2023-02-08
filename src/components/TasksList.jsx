import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask, toggleCompleted } from "../features/tasks/taskSlice";

export const TasksList = () => {
  const [status, setStatus] = useState("all");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (status === "all") return task;
        if (status === "active") return !task.completed;
        return task.completed;
      }),
    [tasks, status]
  );

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-4">
          {tasks.length} task{tasks.length > 1 && "s"}
        </h1>
        <div className="flex space-x-4">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm px-2 py-1"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <Link
            to="/create-task"
            className="bg-indigo-600 px-2 py-1 rounded-sm font-medium"
          >
            Create task
          </Link>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-8">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col justify-between bg-neutral-800 p-4 rounded-md"
          >
            <header className="flex justify-between">
              <h3
                className={`font-medium text-xl ${
                  task.completed && "line-through"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex space-x-2">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-indigo-600 px-2 py-1 rounded-sm inline-block"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 px-2 py-1 rounded-sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </header>
            <div className="flex justify-between">
              <p className={`my-2 ${task.completed && "line-through"}`}>
                {task.description}
              </p>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleCompleted(task.id))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
