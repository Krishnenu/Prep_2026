import { useEffect, useState } from "react";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const Todos = () => {
  const [todoItem, setToDoItem] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data: Todo[] = await res.json();
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
      {todoItem.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};
