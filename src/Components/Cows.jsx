import Cow from "./Cow";

function Cows({ cows, deleteCow, modal }) {
  return (
    <div>
      {cows.map((cow) => (
        <Cow
          key={cow.id}
          modal={modal}
          cow={cow}
          deleteCow={deleteCow}
        ></Cow>
      ))}
    </div>
  );
}
export default Cows;
