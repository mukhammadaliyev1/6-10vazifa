import React, { useRef, useState, useEffect } from "react";
import api from "../../axios";

function Home() {
  const nameRef = useRef();
  const descRef = useRef();
  const selectRef = useRef();
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch user's boards on component mount
  useEffect(() => {
    api
      .get("/api/boards/my-boards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the boards!", error);
      });
  }, [token]);

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      name: nameRef.current.value,
      description: descRef.current.value,
      color: selectRef.current.value,
    };

    api
      .post("/api/boards/create", user, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          // Yangi board qo'shish
          setTasks((prevTasks) => [...prevTasks, response.data]);
          nameRef.current.value = "";
          descRef.current.value = "";
          selectRef.current.value = "red";
        } else {
          console.error("Invalid response from creating board:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error creating the board!", error);
      });
  };

  return (
    <div className="mx-auto">
      <div className="form w-1/3 mx-auto mt-10 flex flex-col gap-5">
        <input
          className="w-full border border-black p-2"
          ref={nameRef}
          type="text"
          placeholder="Enter board name..."
        />
        <textarea
          className="w-full border border-black p-2"
          ref={descRef}
          placeholder="Description..."
        ></textarea>
        <select className="w-full border border-black p-2" ref={selectRef}>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
        <button
          className="w-1/3 bg-blue-700 rounded-md p-3 text-white"
          onClick={handleClick}
        >
          Add Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mx-auto">
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-lg p-4 shadow-md`}
              style={{ backgroundColor: task.color }}
            >
              <h2 className="text-xl font-semibold">{task.name}</h2>
              <p className="mt-2">{task.description}</p>
              <p className="mt-1 text-sm text-gray-500">
                Color: <span style={{ color: task.color }}>{task.color}</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
