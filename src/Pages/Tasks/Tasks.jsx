import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TaskWrapper from "./TaskWrapper";

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
//       fetch(`http://localhost:5000/allTasks/${user?.email}`)
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
      fetch(`http://localhost:5000/allTasks/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          return data;
        }),
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
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
    </DndProvider>
  );
};

export default Tasks;
