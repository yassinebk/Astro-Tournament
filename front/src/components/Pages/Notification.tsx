import React, { Dispatch, SetStateAction } from "react";
import { Notification as NotifType } from "../../types";

interface PropTypes {
  notification: NotifType;
}
const Notification = (props: PropTypes): JSX.Element | null => {
  console.log(props.notification);
  if (!props.notification) return null;
  const variant = props.notification.type;
  let color: string = "gray";
  switch (variant) {
    case "ERROR":
      color = "red";
      break;
    case "INFO":
      color = "blue";
      break;
    case "SUCCESS":
      color = "green";
      break;
    case "OTHER":
      color = "yellow";
      break;
    default:
      color = "gray";
      break;
  }

  return (
    <div className="container items-center px-5 py-12 lg:px-20">
      <div className={`w-full text-${color}-600 border rounded-lg shadow-xl `}>
        <div className="flex items-center justify-between px-6 py-4 mx-auto ">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 icon icon-tabler icon-tabler-alert-triangle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="12" cy="12" r="9"></circle>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
              <polyline points="11 12 12 12 12 16 13 16"></polyline>
            </svg>
            <p className="text-sm font-semibold tracking-wide uppercase ">
              <strong>{variant === "OTHER" ? "Warning" : variant}</strong>
              {props.notification.message}
            </p>
          </div>
          <button
            className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-blueGray-600 focus:outline-none"
            type="button"
            aria-label="Close"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M10 10l4 4m0 -4l-4 4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
