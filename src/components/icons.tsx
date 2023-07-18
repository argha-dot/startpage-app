function PauseButtonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 512 512"
    >
      <path d="M120.16 45A20.162 20.162 0 00100 65.16v381.68A20.162 20.162 0 00120.16 467h65.68A20.162 20.162 0 00206 446.84V65.16A20.162 20.162 0 00185.84 45h-65.68zm206 0A20.162 20.162 0 00306 65.16v381.68A20.162 20.162 0 00326.16 467h65.68A20.162 20.162 0 00412 446.84V65.16A20.162 20.162 0 00391.84 45h-65.68z"></path>
    </svg>
  );
}

function PlayButtonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 512 512"
    >
      <path d="M500.203 236.907L30.869 2.24a21.362 21.362 0 00-20.736.939C3.84 7.083 0 13.931 0 21.333v469.333c0 7.403 3.84 14.251 10.133 18.155a21.267 21.267 0 0011.2 3.179c3.264 0 6.528-.747 9.536-2.24l469.333-234.667C507.435 271.467 512 264.085 512 256s-4.565-15.467-11.797-19.093z"></path>
    </svg>
  );
}

function LoopButtonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.5 13l-.204-.952C2.629 8.935 5.002 6 8.185 6H19m0 0l-3 3m3-3l-3-3m4.5 8l.204.952C21.371 15.065 18.998 18 15.815 18H5m0 0l3-3m-3 3l3 3"
      ></path>
    </svg>
  );
}

export {
  PauseButtonIcon,
  PlayButtonIcon,
  LoopButtonIcon,
}
