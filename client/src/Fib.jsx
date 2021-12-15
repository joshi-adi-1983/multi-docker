import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = (props) => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const fetchedValues = await axios.get("/api/values/current");
    setValues(fetchedValues.data);
    console.log("fetchedValues================>>>", fetchedValues);
  };

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchIndexes = async () => {
    const fetchedIndexes = await axios.get("/api/values/all");
    setSeenIndexes(fetchedIndexes.data);
    console.log("fetchedIndexes================>>>", fetchedIndexes);
  };
  useEffect(() => {
    fetchIndexes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index: index,
    });
    setIndex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(", ")}
      <h3>Calculated values:</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      ))}
    </div>
  );
};

export default Fib;
