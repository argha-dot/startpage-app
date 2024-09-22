import { Link } from "react-router-dom";

const GamesPage = () => {
  return (
    <div className="">
      <Link to="/games/flappy">Flappy</Link>
      <Link to="/games/lineoff">Line Off</Link>
    </div>
  );
};

export default GamesPage;
