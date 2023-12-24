import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import axios from "axios";
import PropTypes from "prop-types";

const TaskWrapper = ({ status, tasks, setTasks, refetch }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  const [, drop] = useDrop(() => ({
    accept: "singleTask",
    drop: (item) => addItemToSection(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = async (id, newStatus) => {
    setTasks((previousTasks) => {
      return previousTasks?.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      );
    });
    await axios.put(`http://localhost:5000/task/${id}`, { status: newStatus });
  };

  let text = "To Do";
  if (status == "ongoing") {
    text = "Ongoing";
  }
  if (status == "completed") {
    text = "Completed";
  }
  return (
    <div ref={drop}>
      <h1
        className={`bg-red-500 text-center py-2 rounded-xl text-lg font-bold ${
          status == "toDo"
            ? " bg-red-400"
            : status == "ongoing"
            ? "bg-orange-400"
            : "bg-green-400"
        }`}>
        {text}
      </h1>

      <ul>
        {filteredTasks.map((singleTask) => (
          <TaskItem
            key={singleTask._id}
            singleTask={singleTask}
            status={status}
            refetch={refetch}></TaskItem>
        ))}
      </ul>
    </div>
  );
};

TaskWrapper.propTypes = {
  status: PropTypes.string,
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  refetch: PropTypes.func,
};

export default TaskWrapper;
