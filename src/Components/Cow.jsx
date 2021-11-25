function Cow({ cow, deleteCow, modal }) {
  const showEdit = () => {
    modal(cow);
  };

  // Day format
  const d = new Date(cow.last_use_time);
  let month = "00" + (d.getMonth() + 1);
  month = month.substring(month.length - 2);
  let day = "00" + d.getDate();
  day = day.substring(day.length - 2);
  cow.last_use_time = `${d.getFullYear()}-${month}-${day}`;

  return (
    <div className="list">
      <span>Name: </span>
      <div className="each-item">
        <div>{cow.name}</div>
      </div>
      <span>weight: </span>
      <div className="each-item">
        <div>{cow.weight}</div>
      </div>
      <div className="each-item">
        <span>total milk: </span>
        <div>{cow.total_milk}</div>
      </div>
      <div className="each-item">
        <span>last milking time: </span>
        <div>{cow.last_milking_time}</div>
      </div>
      <div className="each-item">
        <span>one day milk: </span>
        <div>{cow.one_day_milk}</div>
      </div>
      <button onClick={() => deleteCow(cow.id)}>Delete</button>
      <button onClick={showEdit}>Edit</button>
    </div>
  );
}
export default Cow;
