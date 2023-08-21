// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

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
  const { userName } = useLoaderData()   // used to access the data loaded by the mainLoader function

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        {/* serves as a placeholder for nested routes. This allows the rendering of child 
        components based on the route structure. */}
        <Outlet />
      </main>
    </div>
  )
}
export default Main