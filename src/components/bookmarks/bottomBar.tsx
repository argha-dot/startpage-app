import { usePsuedoFSContext } from "@/hooks/useThisContext";

const BottomBar = () => {
  const {currentPath} = usePsuedoFSContext();

  return <div>
    {currentPath}
  </div>
}

export default BottomBar;
