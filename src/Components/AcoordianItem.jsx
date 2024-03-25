import React from "react";
import { TECollapse } from "tw-elements-react";
import { useRef } from "react";
import "./Accordian.css";
function AccordionItem({ id, title, activeElement, payload, handleClick }) {
  const isActive = activeElement === id;
  const payloadRef = useRef(null);
  const copyToClipboard = () => {
    payloadRef.current?.select();
    window.navigator.clipboard.writeText(payload);
  };

  return (
    <div className="outer-div rounded border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 mb-4">
      <h2 className="mb-0" id={`heading${id}`}>
        <button
          className={`${
            isActive &&
            `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
          } group relative flex w-full items-center rounded-none border-0  px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
          type="button"
          onClick={() => handleClick(id)}
          aria-expanded={isActive}
          aria-controls={`collapse${id}`}>
          {title}
          <span
            className={`${
              isActive
                ? `rotate-[-180deg] -mr-1`
                : `rotate-0 fill-[#212529] dark:fill-white`
            } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
      </h2>
      <TECollapse
        show={isActive}
        className="!mt-0 !rounded-b-none !shadow-none">
        <div className="px-5 py-4 flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-11/12">
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-600 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput50"
              value={payload}
              aria-label="readonly input example"
              readOnly
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              onClick={() => {
                copyToClipboard();
              }}
              className="inline-block rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
              Copy
            </button>
          </div>
        </div>
      </TECollapse>
    </div>
  );
}

export default AccordionItem;
