// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

// assets
// import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers"

// loader
// intended to be used as a data loader for the route.
export function mainLoader() {
  const userName = fetchData("userName");   // fetchData is called to retrieve user data.
  return { userName }
}

const Main = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = JSON.parse(localStorage.getItem("userName"));
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Main