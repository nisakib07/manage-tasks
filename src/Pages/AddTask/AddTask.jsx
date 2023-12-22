import { useForm } from "react-hook-form";
import Navbar from "../Home/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newTask = {
      taskName: data.taskName,
      taskDescription: data.taskDescription,
      priority: data.priority,
      status: "toDo",
      email: user?.email,
      deadline: data.deadline,
    };

    axios.post("http://localhost:5000/tasks", newTask).then((res) => {
      if (res.data.insertedId) {
        reset();
        toast.success("Task Added");
      }
    });
  };

  return (
    <div className="bg-zinc-400">
      <Navbar></Navbar>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/g4W9CNv/login-bg.jpg)",
        }}>
        <div className="hero-content text-center">
          <div className="bg-orange-200 p-5 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Task Name</span>
                  </label>
                  <input
                    required
                    type="text"
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
                  className="textarea textarea-bordered"
                  {...register("taskDescription")}></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deadline</span>
                </label>
                <input
                  required
                  type="date"
                  className="input input-bordered"
                  {...register("deadline")}
                />
              </div>

              <input className="btn" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
