import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

function TodoList() {
  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];
  const prioptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#292047",
      borderRadius: "1.4rem",
      borderColor: state.isFocused ? "#ffffff99" : "#ffffff33",
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
      color: "#e0e0ff",
      "&:hover": {
        borderColor: "#ffffff99",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#292047",
      borderRadius: "1.4rem",
      marginTop: "4px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#45405E" : "#292047",
      color: "#e0e0ff",
      cursor: "pointer",
      borderRadius: "1.4rem",
      "&:active": {
        backgroundColor: "#171036",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#e0e0ff",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#e0e0ff",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#e0e0ff",
      "&:hover": {
        color: "#ffffff99",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    input: (base) => ({
      ...base,
      color: "#e0e0ff",
    }),
  };
  let taskslocal = JSON.parse(localStorage.getItem("tasks")) || [];
  let [Tasks, setTasks] = useState([]);
  const taskInput = useRef(null);
  const date = useRef(null);
  const searchInput = useRef(null);
  const dateInput = useRef(null);
  const priority = useRef(null);
  let [isEditing, setIsEditing] = useState(false);
  let [editId, setEditId] = useState(null);
  let [priorityFilter, setPriorityFilter] = useState("high");

  let addTask = () => {
    let taskValue = taskInput.current.value;
    let taskDate = date.current.value;

    let taskobj = {
      id: Math.floor(Math.random() * 10000),
      task: taskValue,
      date: taskDate,
      completed: false,
      priority: priorityFilter ? priorityFilter : "No priority",
    };
    let newTask = [...Tasks];
    newTask.push(taskobj);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setTasks(newTask);
    taskInput.current.value = "";
    date.current.value = "";
    setPriorityFilter("high");
  };
  let Edit = (id) => {
    let taskToEdit = Tasks.find((task) => task.id === id);
    if (taskToEdit) {
      taskInput.current.value = taskToEdit.task;
      date.current.value = taskToEdit.date;
      setPriorityFilter(taskToEdit.priority);
      setIsEditing(true);
      setEditId(id);
    }
  };
  let updateTask = () => {
    let taskValue = taskInput.current.value;
    let taskDate = date.current.value;
    let newpriority = priorityFilter ? priorityFilter : "No priority";

    let updatedTask = Tasks.map((task) => {
      if (task.id === editId) {
        return {
          ...task,
          task: taskValue,
          date: taskDate,
          priority: newpriority,
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    setTasks(updatedTask);
    setIsEditing(false);
    setEditId(null);
    taskInput.current.value = "";
    date.current.value = "";
    setPriorityFilter("high");
  };
  let filterTasks = (e) => {
    if (e.value === "all") {
      setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    } else if (e.value === "active") {
      let newTask = taskslocal.filter((tasks) => tasks.completed === false);
      setTasks(newTask);
    } else if (e.value === "completed") {
      let newTask = taskslocal.filter((tasks) => tasks.completed === true);
      setTasks(newTask);
    }
  };
  let search = () => {
    let searchValue = searchInput.current.value;
    if (searchValue === "") {
      setTasks(taskslocal);
      return;
    }
    let newTask = Tasks.filter((task) =>
      task.task.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTasks(newTask);
  };
  let filterDate = () => {
    let newDate = dateInput.current.value;
    if (newDate === "") {
      setTasks(taskslocal);
      return;
    }
    let newTask = Tasks.filter((task) => task.date === newDate);
    setTasks(newTask);
  };
  let completeTask = (id) => {
    let newTask = Tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  let deleteTask = (id) => {
    let newTask = Tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };
  useEffect(() => {
    setTasks(taskslocal);
  }, []);

  return (
    <div>
      <div className=" min-w-[250px] md:min-w-[450px] lg:min-w-[700px] bg-containerTask border border-border text-text shadow-[0px_0px_50px_#45405E] p-2 rounded-3xl  min-h-[450px]">
        
        <h1 className="text-center text-[40px] text-white font-bold header pt-4 pb-2 animate-antibright">
          🌌 Cosmic To-Do List 🌠
        </h1>

        <div className="head mb-2 pt-3 px-4 pb-4">
          <input type="text"
            ref={taskInput}
            className="input w-full h-10 rounded-3xl p-3 border border-border bg-input my-3 animate-bright"
            placeholder="Write a task..."
          />
          <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-5 ">
            <input
              type="date"
              ref={date}
              className=" w-full h-10 rounded-3xl px-3 border border-border bg-input animate-bright"
            />
            <Select
              value={prioptions.find((opt) => opt.value === priorityFilter)}
              options={prioptions}
              ref={priority}
              onChange={(e) => setPriorityFilter(e.value)}
              className="w-full rounded-3xl"
              styles={customStyles}
            />
          </div>
          <button
            className="btn w-full md:w-1/2 block mx-auto h-10 rounded-3xl mt-4 bg-transparent border border-white shadow-md shadow-hover hover:bg-hover hover:shadow-lg  hover:shadow-hover transition ease-in-out duration-2"
            onClick={isEditing ? updateTask : addTask}
          >
            {isEditing ? "✨ Update Task" : "✨ Add Task"}
          </button>
        </div>

        <div className="filters p-4 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-3">
          <div className="search col-span-1 md:col-span-2">
            <input
              onChange={search}
              type="text"
              ref={searchInput}
              className="input w-full h-10 rounded-3xl border border-border bg-input p-3 animate-bright"
              placeholder="Search tasks..."
            />
          </div>
          <div className="date ">
            <input
              type="date"
              onChange={filterDate}
              ref={dateInput}
              className="input h-10 w-full rounded-3xl border border-border bg-input p-2 animate-bright"
            />
          </div>
          <div className="filters">
            <Select
              defaultValue={options[0]}
              options={options}
              onChange={filterTasks}
              className=" w-full rounded-3xl"
              styles={customStyles}
            />
          </div>
        </div>

        <div className={`taskscontainer p-0 md:px-4 overflow-y-auto text-text md:max-h-[320px] max-h-[280px]  ${Tasks.length > 0 ? "" : "flex justify-center items-center"}`}>
          {Tasks.length > 0 ? Tasks.map((task) => {
            return (
              <div
                key={task.id}
                className={`task my-4 bg-task rounded-3xl grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-0 p-2 w-full animate-move shadow-[0px_0px_10px_#45405E] hover:shadow-[0px_0px_18px_#797883] ${task.completed ? "opacity-75" : "opacity-100"
                  }`}
              >
                <div className="taskcontent col-span-1 md:col-span-2 flex items-center gap-6 p-3 w-full">
                  <div className="completedTask flex gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => completeTask(task.id)}
                      checked={task.completed}
                    />
                    <p
                      className={`${task.completed
                          ? "line-through text-gray-400 decoration-gray-700 decoration-[0.1rem] line-through-offset-4"
                          : ""
                        }`}
                    >
                      {task.task}
                    </p>
                  </div>
                  <p
                    className={`${task.completed
                        ? "line-through text-gray-400 decoration-gray-700 decoration-[0.1rem] line-through-offset-4"
                        : ""
                      }`}
                  >
                    {task.date}
                  </p>
                  <p
                    className={`bg-priority px-2 py-1 rounded-full ${task.completed
                        ? "line-through text-gray-400 decoration-gray-700 decoration-[0.1rem] line-through-offset-4"
                        : ""
                      }`}
                  >
                    {task.priority}
                  </p>
                </div>

                <div className="buttons flex items-center gap-2 w-full">
                  <button
                    disabled={task.completed}
                    onClick={() => Edit(task.id)}
                    className={`btn md:w-[90px] w-full p-2 rounded-full border-2 border-update text-update  hover:bg-hover transition ease-in-out duration-2 ${task.completed
                        ? "line-through decoration-[0.1rem] decoration-gray-700 line-through-offset-4"
                        : ""
                      }`}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    disabled={task.completed}
                    onClick={() => deleteTask(task.id)}
                    className={`btn rounded-full md:w-[90px] p-2 w-full  border-2 border-delete text-delete text-white hover:bg-hover transition ease-in-out duration-2 ${task.completed
                        ? "line-through decoration-[0.1rem] decoration-gray-700 line-through-offset-4"
                        : ""
                      } `}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            );
          }): <div className="text-text h-fit font-semibold text-2xl md:text-start text-center  p-2 my-2">No tasks found 😔, Please add a task</div>
          }
        </div>

      </div>
    </div>
  );
}

export default TodoList;
