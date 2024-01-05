import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function TaskList({ tasks, removeTask, editTask, doneTask }) {
  const [priority, setPriority] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  function handlePriorityFilter() {
    setPriority((prev) => !prev);
  }

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks, priority]);

  useEffect(() => {
    const filtered = priority
      ? tasks.filter((item) => item.priority === priority)
      : tasks;
    setFilteredTasks(filtered);
  }, [priority, tasks]);

  return (
    <>
      <div classNameName="bottom">
        <div className="star">
          <a
            onClick={handlePriorityFilter}
            className={`${!priority ? "priority" : "all"} `}
          >
            <FontAwesomeIcon icon={faStar} size="2xl"/>
            {!priority ? "" : ""}{" "}
          </a>
        </div>
        <div className="card-list">
          {filteredTasks.map((item) => (
            <div
              className={`card ${item.isDone ? "complete" : ""}`}
              key={item.uuid}
            >
              {item.priority && (
                <div className="star-icon">
                  <FontAwesomeIcon  icon={faStar} style={{color:"#222831"}} />
                </div>
              )}
              <div className="card-content">
                <div className="content">
                  <p>{item.task}</p>
                </div>
                <div className="buttons">
                  <button onClick={() => doneTask(item.uuid)}>
                    <FontAwesomeIcon icon={faCheck} style={{color:"black"}} size="xl"/>
                  </button>
                  <button onClick={() => editTask(item.uuid)}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{color:"black"}} size="xl"/>
                  </button>
                  <button onClick={() => removeTask(item.uuid)}>
                    <FontAwesomeIcon icon={faTrashCan} style={{color:"black"}} size="xl"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
