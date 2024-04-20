import { useEffect, useState } from "react";
import AccordionItem from "./Components/AcoordianItem";
import shellCodes from "./scripts/shellCodes";
import "./App.css";
function App() {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [activeElement, setActiveElement] = useState("");

  useEffect(() => {}, [ip, port, activeElement]);

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  return (
    <>
      <div className="w-full sm:w-4/5 mx-auto">
        <div className="relative w-full ">
          <div className="mx-auto flex flex-col sm:flex-row max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2 justify-center">
              <span>
                <img
                  src="/src/assets/Rootmelogo.png"
                  className="h-10"
                  alt="logo"></img>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-5 mt-4">
              <input
                className="flex h-10 w-full sm:w-[250px] rounded-md px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 placeholder:italic hover:bg-hover-blue border border-gray-300 shadow-md hover:shadow-lg input-shadow"
                type="text"
                onChange={(e) => {
                  setIp(e.target.value);
                }}
                value={ip}
                placeholder="IP Address"
              />

              <input
                className="flex h-10 w-full sm:w-[200px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 placeholder:italic hover:bg-hover-blue border border-gray-300 mt-4 sm:mt-0 shadow-md hover:shadow-lg input-shadow"
                type="text"
                onChange={(e) => {
                  setPort(e.target.value);
                }}
                value={port}
                placeholder="Port"
              />
            </div>
          </div>
        </div>
        <div
          id="accordionExample"
          className="w-full sm:w-4/5 mt-5 flex-col gap-4 mx-auto">
          {Object.entries(shellCodes).map(([key, value], index) => (
            <AccordionItem
              key={index}
              id={`item${index}`}
              title={key}
              activeElement={activeElement}
              handleClick={handleClick}
              payload={value.replace("#{IP}", ip).replace("#{PORT}", port)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
