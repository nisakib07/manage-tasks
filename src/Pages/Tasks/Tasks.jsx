import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";

import { CiEdit } from "react-icons/ci";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const {
    data: allTasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTasks"],
    enabled: !!user?.email,
    queryFn: () =>
      fetch(`http://localhost:5000/allTasks/${user?.email}`).then((res) =>
        res.json()
      ),
  });

  const toDo = allTasks.filter((task) => task.status === "toDo");
  const completed = allTasks.filter((task) => task.status === "completed");
  const ongoing = allTasks.filter((task) => task.status === "ongoing");
  console.log(toDo, completed, ongoing);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div>
          <h1 className="bg-red-500 text-center py-2 rounded-xl text-lg font-bold">
            To Do
          </h1>

          <ul>
            {toDo &&
              toDo.map((singleTask) => (
                <li
                  className="bg-cyan-300 mt-2 rounded-lg px-2 min-h-10 py-3"
                  key={singleTask._id}>
                  <h3 className="text-lg font-semibold">
                    {singleTask.taskName}
                  </h3>
                  <p className="text-justify text-sm">
                    {singleTask.taskDescription}
                  </p>
                  <div className="mt-3 text-xl flex gap-3">
                    <button>
                      <CiEdit></CiEdit>
                    </button>
                    <button>
                      <MdDeleteOutline></MdDeleteOutline>
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h1 className="bg-orange-500 text-center py-2 rounded-xl text-lg font-bold">
            Ongoing
          </h1>
          <ul>
            {ongoing &&
              ongoing.map((singleTask) => (
                <li
                  className="bg-cyan-300 mt-2 rounded-lg px-2 min-h-10 py-3"
                  key={singleTask._id}>
                  <h3 className="text-lg font-semibold">
                    {singleTask.taskName}
                  </h3>
                  <p className="text-justify text-sm">
                    {singleTask.taskDescription}
                  </p>
                  <div className="mt-3 text-xl flex gap-3">
                    <button>
                      <CiEdit></CiEdit>
                    </button>
                    <button>
                      <MdDeleteOutline></MdDeleteOutline>
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h1 className="bg-green-500 text-center py-2 rounded-xl text-lg font-bold">
            Completed
          </h1>
          <ul>
            {completed &&
              completed.map((singleTask) => (
                <li
                  className="bg-cyan-300 mt-2 rounded-lg px-2 min-h-10 py-3"
                  key={singleTask._id}>
                  <h3 className="text-lg font-semibold">
                    {singleTask.taskName}
                  </h3>
                  <p className="text-justify text-sm">
                    {singleTask.taskDescription}
                  </p>
                  <div className="mt-3 text-xl flex gap-3">
                    <button>
                      <CiEdit></CiEdit>
                    </button>
                    <button>
                      <MdDeleteOutline></MdDeleteOutline>
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
