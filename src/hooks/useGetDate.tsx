import { useEffect, useState } from "react";

function useGetDate() {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerInterval = setInterval(refreshClock, 500);
    return () => clearInterval(timerInterval);
  }, []);

  return date;
}

export default useGetDate;
