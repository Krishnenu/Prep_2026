import { useState } from "react";
import fruits from "../__mocks__/fruitList.json";

export const DebounceList = () => {
  const [fruitList, setFruitList] = useState(fruits);

  return (
    <div>
      <input type="text" placeholder="Enter Fruit Name" />
      {fruitList?.map((fruit) => {
        return <div key={fruit.id}>{fruit.name}</div>;
      })}
    </div>
  );
};
