import { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>

      {count >= 5 && <p>Limit reached</p>}
    </div>
  );
};

export default Test;
