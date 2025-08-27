import { Fragment } from "react";

interface Props {
  title: string;
  message: string;
  type: "success" | "warning" | "error";
  close: () => void;
}

const InfoCard = ({ title, message, type, close }: Props) => {
  return (
    <div className="z-40 fixed top-0 left-0 w-full h-dvh flex flex-col gap-2 justify-center items-center bg-white/50 backdrop-blur-xs">
      <div className="flex w-3/4 h-24 overflow-hidden bg-white shadow-lg max-w-96 rounded-xl">
        {type === "success" ? (
          <svg width={16} height={96} xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 8 0 
             Q 4 4.8, 8 9.6 
             T 8 19.2 
             Q 4 24, 8 28.8 
             T 8 38.4 
             Q 4 43.2, 8 48 
             T 8 57.6 
             Q 4 62.4, 8 67.2 
             T 8 76.8 
             Q 4 81.6, 8 86.4 
             T 8 96 
             L 0 96 
             L 0 0 
             Z"
              fill="#66cdaa"
              stroke="#66cdaa"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        ) : type === "warning" ? (
          <svg width={16} height={96} xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 8 0 
             Q 4 4.8, 8 9.6 
             T 8 19.2 
             Q 4 24, 8 28.8 
             T 8 38.4 
             Q 4 43.2, 8 48 
             T 8 57.6 
             Q 4 62.4, 8 67.2 
             T 8 76.8 
             Q 4 81.6, 8 86.4 
             T 8 96 
             L 0 96 
             L 0 0 
             Z"
              fill="tan"
              stroke="tan"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height={96} width={16}>
            <path
              strokeLinecap="round"
              strokeWidth={2}
              stroke="indianred"
              fill="indianred"
              d="M 8 0 
             Q 4 4.8, 8 9.6 
             T 8 19.2 
             Q 4 24, 8 28.8 
             T 8 38.4 
             Q 4 43.2, 8 48 
             T 8 57.6 
             Q 4 62.4, 8 67.2 
             T 8 76.8 
             Q 4 81.6, 8 86.4 
             T 8 96 
             L 0 96 
             L 0 0 
             Z"
            />
          </svg>
        )}
        <div className="mx-2.5 overflow-hidden w-full">
          <h2
            className={`mt-1.5 text-xl font-bold leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap ${
              type === "success"
                ? "text-[#66cdaa]"
                : type === "warning"
                ? "text-[peru]"
                : "text-[indianred]"
            }`}
          >
            {title}
          </h2>
          <p className="overflow-hidden leading-5 break-all text-zinc-400 max-h-10">
            {message.split(/(<br\/>)/).map((node, i) => (
              <Fragment key={i}>{node === "<br/>" ? <br /> : node}</Fragment>
            ))}
          </p>
        </div>
        <button
          className="w-16 cursor-pointer focus:outline-none"
          onClick={close}
        >
          {type === "success" ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="mediumseagreen"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : type === "warning" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="peru"
              fill="none"
              className="w-7 h-7"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="indianred"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
