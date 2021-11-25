import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Modal from "./Components/Modal";
import Newcow from "./Components/NewCow";
import Cows from "./Components/Cows";
import ActionMsg from "./Components/ActionMsg";

function App() {
  // Testas
  // useEffect(() => {
  //   axios.get('http://localhost:3003/test')
  //     .then(res => {
  //       console.log(res.data);
  //     })
  // }, [])
  // -------------------------------------------------------
  const [cows, setcows] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // ----------------- ACTION MESSAGES -----------------
  const [showMsg, setShowMsg] = useState(false);
  const msg = useRef("");

  const addMsg = (text) => {
    msg.current = text;
    setShowMsg(true);
    setTimeout(() => {
      clearMsg();
    }, 2000);
  };

  const clearMsg = () => {
    setShowMsg(false);
  };

  // Read node
  useEffect(() => {
    axios.get("http://localhost:3003/cows").then((res) => {
      setcows(res.data);
      console.log(res.data);
    });
  }, [lastUpdate]);

  // Delete node
  const deleteCow = (id) => {
    setShowModal(false);
    axios.delete("http://localhost:3003/cows/" + id).then((res) => {
      addMsg("cow successfully removed !");
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };
  // -----------------------------------------
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState({
    name: "",
    weight: "",
    total_milk: "",
    last_milk_time: "",
    one_day_milk: "",
  });

  const modal = (cow) => {
    setShowModal(true);
    setModalElement(cow);
  };

  const hide = () => {
    setShowModal(false);
  };
  // -------------------------------------------------
  // Edit node
  const edit = (cow, id) => {
    setShowModal(false);
    axios.put("http://localhost:3003/cows/" + id, cow).then((res) => {
      addMsg("cow successfully saved !");
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  // Create Node
  const create = (cow) => {
    axios.post("http://localhost:3003/cows", cow).then((res) => {
      addMsg("cow successfully added !");
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  return (
    <div className="general">
      <ActionMsg msg={msg.current} showMsg={showMsg}></ActionMsg>
      <h1>
        {" "}
        <span>Cows</span>
      </h1>
      <Newcow create={create} />
      <Modal
        showModal={showModal}
        hide={hide}
        modalElement={modalElement}
        deleteCow={deleteCow}
        edit={edit}
      />
      <Cows
        cows={cows}
        deleteCow={deleteCow}
        modal={modal}
      />
    </div>
  );
}
export default App;
