import { Link } from "react-router-dom";

const GamesPage = () => {
  return (
    <div>
      <Link to="/games/2048">2048</Link>
      <Link to="/games/flappy">Flappy</Link>
    </div>
  );
};

export default GamesPage;
