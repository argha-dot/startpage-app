import { Link } from "react-router-dom";

const GamesPage = () => {
  return (
    <div>
      <Link to="/games/flappy">Flappy</Link>
      <Link to="/games/dino">Dino</Link>
    </div>
  );
};

export default GamesPage;
