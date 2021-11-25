import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit, deleteCow }) {
  const [inputs, setInputs] = useState({
    name: "",
    weight: "",
    total_milk: "",
    last_milking_time: "",
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

  useEffect(() => {
    setInputs({
      name: modalElement.name,
      weight: modalElement.weight,
      total_milk: modalElement.total_milk,
      last_milking_time: modalElement.last_milking_time,
      one_day_milk: modalElement.one_day_milk,
    });
  }, [modalElement]);

  const handleEdit = () => {
    edit(
      {
        name: inputs.name,
        weight: inputs.weight,
        total_milk: inputs.total_milk,
        last_milking_time: inputs.last_milking_time,
        one_day_milk: inputs.one_day_milk,
      },
      modalElement.id
    );
  };

  return (
    <div
      className="general-modal"
      style={{
        display: showModal ? "block" : "none",
        top: window.scrollY + 100 + "px",
      }}
    >
      <div className="each-modal">
        <span>name: </span>{" "}
        <input
          type="text"
          value={inputs.name}
          onChange={(e) => control(e, "name,")}
          readOnly
        />
      </div>
      <div className="each-modal">
        <span>last milking </span>{" "}
        <input
          type="number"
          value={inputs.last_milking_time}
          onChange={(e) => control(e, "last_milking_time")}
          readOnly
        />
      </div>
      <div className="each-modal">
        <span>total milk: </span>{" "}
        <input
          type="date"
          value={inputs.total_milk}
          onChange={(e) => control(e, "total_milk")}
          readOnly
        />
      </div>
      <div className="each-modal">
        <span> update weight: </span>{" "}
        <input
          type="checkbox"
          value={inputs.weight}
          onChange={(e) => control(e, "weight")}
          checked={inputs.weight}
        />
      </div>

      <div className="each-modal">
        <span>Update total milk: </span>{" "}
        <input
          type="date"
          value={inputs.total_milk}
          onChange={(e) => control(e, "total_milk")}
          required
        />
      </div>
      <div className="each-modal">
        <span>Update one day milk: </span>{" "}
        <input
          type="number"
          value={inputs.one_day_milk}
          onChange={(e) => control(e, "one_day_milk")}
          required
        />
      </div>
      <div className="each-modal">
        <button onClick={handleEdit}>Save</button>
        <button onClick={hide}>Return</button>
        <button onClick={() => deleteCow(modalElement.id)}>Delete</button>
      </div>
    </div>
  );
}
export default Modal;
