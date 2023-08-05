import { Context, useContext } from "react";

const useThisContext = <T,>(thisContext: Context<T>) => {
  const context = useContext(thisContext);

  if (!context) {
    throw new Error("no provider provided")
  }

  return context
}


export default useThisContext;
