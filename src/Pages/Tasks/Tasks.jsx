import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TaskWrapper from "./TaskWrapper";
import { Typewriter } from "react-simple-typewriter";

// const Tasks = () => {
//   const { user } = useContext(AuthContext);
//   const [tasks, setTasks] = useState([]);
//   const [toDo, setToDo] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [ongoing, setOngoing] = useState([]);
//   const {
//     data: allTasks = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["allTasks"],
//     enabled: !!user?.email,
//     queryFn: () =>
//       fetch(`https://manage-tasks-server-nu.vercel.app/allTasks/${user?.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setTasks(data);
//         }),
//   });

//   useEffect(() => {
//     const toDo = tasks?.filter((task) => task.status === "toDo");
//     const completed = tasks?.filter((task) => task.status === "completed");
//     const ongoing = tasks?.filter((task) => task.status === "ongoing");
//     setToDo(toDo);
//     setCompleted(completed);
//     setOngoing(ongoing);
//   }, [tasks]);

//   const taskStatus = ["toDo", "ongoing", "completed"];

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
//         {taskStatus.map((status, idx) => (
//           <TaskWrapper
//             key={idx}
//             status={status}
//             toDo={toDo}
//             ongoing={ongoing}
//             completed={completed}
//             tasks={tasks}
//             setTasks={setTasks}></TaskWrapper>
//         ))}
//       </div>
//     </DndProvider>
//   );
// };

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const { refetch } = useQuery({
    queryKey: ["allTasks"],
    enabled: !!user?.email,
    queryFn: () =>
      fetch(`https://manage-tasks-server-nu.vercel.app/allTasks/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          return data;
        }),
  });

  return (
    <DndProvider backend={HTML5Backend}>
      {tasks.length === 0 ? (
        <div className="flex justify-center text-xl min-h-[90vh] items-center">
          <p>
            Welcome! Keep note so that you{" "}
            <span className="font-bold uppercase">
              <Typewriter
                words={["never miss", "never forget", "become perfect"]}
                loop={10}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto min-h-screen mt-10">
          {["toDo", "ongoing", "completed"].map((status, idx) => (
            <TaskWrapper
              key={idx}
              status={status}
              tasks={tasks}
              setTasks={setTasks}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </DndProvider>
  );
};

export default Tasks;
