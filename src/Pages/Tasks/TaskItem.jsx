import { useDrag } from "react-dnd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const TaskItem = ({ singleTask, status, refetch }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "singleTask",
    item: { id: singleTask._id, status: status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (id) => {
    Swal.fire({
      title: "Want to delete this article?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/task/${singleTask._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              toast.success("Article Deleted");
            }
          });
      }
    });
  };

  const statusToColor = {
    toDo: "bg-red-300",
    ongoing: "bg-orange-300",
    completed: "bg-green-300",
  };

  const backgroundColor = statusToColor[status];

  return (
    <>
      <li
        ref={drag}
        className={`${backgroundColor} mt-2 rounded-lg px-2 min-h-10 py-3`}>
        <h3 className="text-lg font-semibold">{singleTask.taskName}</h3>
        <p className="text-justify text-sm h-[70px]">
          {singleTask.taskDescription}
        </p>
        <div className="mt-3 text-xl flex gap-3">
          <button>
            <CiEdit></CiEdit>
          </button>
          <button onClick={handleDelete}>
            <MdDeleteOutline></MdDeleteOutline>
          </button>
        </div>
      </li>
    </>
  );
};

TaskItem.propTypes = {
  singleTask: PropTypes.object,
  status: PropTypes.string,
};

export default TaskItem;
