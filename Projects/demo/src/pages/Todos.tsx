import { useEffect, useState } from "react";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const Todos = () => {
  const [todoItem, setToDoItem] = useState<Todo[]>([]);
  const [error, setError] = useState([]);
  const fetchTodos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setToDoItem(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
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
