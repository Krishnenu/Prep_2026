import { useEffect, useState } from "react";

export const Todos = () => {
  //https://jsonplaceholder.typicode.com/todos

  const [todoItem, setToDoItem] = useState([]);
  const fetchTodos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setToDoItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {todoItem?.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};
