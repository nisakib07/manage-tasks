import { useDrag } from "react-dnd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaRegEye } from "react-icons/fa";

const TaskItem = ({ singleTask, status, refetch }) => {
  const { register, handleSubmit } = useForm();

  const { user } = useContext(AuthContext);

  const [, drag] = useDrag(() => ({
    type: "singleTask",
    item: { id: singleTask._id, status: status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    Swal.fire({
      title: "Want to delete this task?",
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
              toast.success("Task Deleted");
            }
          });
      }
    });
  };

  const onSubmit = async (data) => {
    const updatedTask = {
      taskName: data.taskName,
      taskDescription: data.taskDescription,
      priority: data.priority,
      status: "toDo",
      email: user?.email,
      deadline: data.deadline,
    };

    await axios
      .put(`http://localhost:5000/task/${singleTask._id}`, updatedTask)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Updated Successfully");
          refetch();
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
        <p className="text-justify text-sm h-[50px]">
          {singleTask.taskDescription.length < 50 ? (
            singleTask.taskDescription
          ) : (
            <>{singleTask.taskDescription.slice(0, 50)}...</>
          )}
        </p>
        <div className="mt-3 text-xl flex gap-3">
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}>
            <CiEdit></CiEdit>
          </button>
          <button onClick={handleDelete}>
            <MdDeleteOutline></MdDeleteOutline>
          </button>
          <button
            onClick={() =>
              document.getElementById(`${singleTask._id}`).showModal()
            }>
            <FaRegEye></FaRegEye>
          </button>
        </div>
      </li>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Task Name</span>
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue={singleTask.taskName}
                    placeholder="Task Name"
                    className="input input-bordered"
                    {...register("taskName")}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>
                  <select
                    required
                    className="select select-bordered"
                    {...register("priority")}>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Description</span>
                </label>
                <textarea
                  required
                  placeholder="Task Description"
                  defaultValue={singleTask.taskDescription}
                  className="textarea textarea-bordered"
                  {...register("taskDescription")}></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deadline</span>
                </label>
                <input
                  required
                  defaultValue={singleTask.deadline}
                  type="date"
                  className="input input-bordered"
                  {...register("deadline")}
                />
              </div>
              <div className="flex justify-center mt-4">
                <input
                  className="btn bg-zinc-700 text-white border-none hover:bg-zinc-600"
                  type="submit"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        id={singleTask._id}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="font-bold text-xl">{singleTask.taskName}</h1>
          <p className="py-4">{singleTask.taskDescription}</p>
          <p>
            <span className="font-bold">Deadline : </span>
            {singleTask.deadline}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

TaskItem.propTypes = {
  singleTask: PropTypes.object,
  status: PropTypes.string,
  refetch: PropTypes.func,
};

export default TaskItem;
