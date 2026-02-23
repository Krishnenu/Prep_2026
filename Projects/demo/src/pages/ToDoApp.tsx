import { useRef, useState } from "react";
type Task = {
  task: string;
  status: string;
};

export const ToDoApp = () => {
  const taskRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const [taskList, setTaskList] = useState<Task[]>([]);

  const addTask = () => {
    if (!taskRef.current || !statusRef.current) return;

    const task = taskRef.current.value.trim();
    const status = statusRef.current.value.trim();

    if (task && status) {
      setTaskList((prev) => [...prev, { task, status }]);
      taskRef.current.value = "";
      statusRef.current.value = "";
      taskRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="TaskName"
            ref={taskRef}
            name="TaskName"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Status"
            ref={statusRef}
            name="Status"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div>
        <button onClick={addTask}>Add Task</button>
      </div>
      {taskList.length > 0 ? (
        <ul>
          {taskList?.map((item, index) => (
            <li key={index}>
              <strong>{item.task}</strong> - {item.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks added</p>
      )}
    </div>
  );
};
