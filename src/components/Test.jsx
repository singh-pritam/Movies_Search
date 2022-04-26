import React, { useEffect, useState } from "react";

const Test = () => {
  console.log("1");
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
    console.log(count);
    console.log("3");
  };

  return (
    <div>
      {console.log("2")}
      <h1>{count}</h1>
      <button onClick={incrementCount}>button</button>
    </div>
  );
};

export default Test;
