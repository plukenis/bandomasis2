import { useState } from "react";

function NewCow({ create }) {
  const [inputs, setInputs] = useState({
    name: "",
    weight: "",
    total_milk: "",
    last_milking_time: " ",
    one_day_milk: "",
  });

  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    // if (what === "weight") {
    //   inputsCopy[what] = !inputs.weight;
    // }
    setInputs(inputsCopy);
  };

  const handleCreate = () => {
    create(inputs);
    setInputs({
      name: "",
      weight: " ",
      total_milk: "",
      last_milking_time: "",
      one_day_milk: "",
    });
  };

  return (
    <div className="new-item">
      <div className="each-new-item">
        <span>name: </span>{" "}
        <input
          type="text"
          value={inputs.name}
          onChange={(e) => control(e, "name")}
          placeholder="insert 8 character combo"
          required
        //   minLength="8"
        //   maxLength="8"
        //   onKeyPress={(event) => {
        //     if (
        //       !/['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]/.test(
        //         event.key
        //       )
        //     ) {
        //       {
        //         event.preventDefault();
        //       }
        //     }
        //   }}
        />
      </div>
      <div className="each-new-item">
        <span>total milk: </span>{" "}
        <input
          type="number"
          value={inputs.total_milk}
          onChange={(e) => control(e, "total_milk")}
          required
        />
      </div>
      <div className="each-new-item">
        <span>one day milk: </span>{" "}
        <input
          type="number"
          value={inputs.one_day_milk}
          onChange={(e) => control(e, "one_day_milk")}
          required
        />
      </div>
      <div className="each-new-item">
        <span>last milking time: </span>{" "}
        <input
          type="date"
          value={inputs.last_milking_time}
          onChange={(e) => control(e, "last_milking_time")}
        />
      </div>
      <div className="each-new-item">
        <button onClick={handleCreate}>Save</button>
      </div>
    </div>
  );
}
export default NewCow;