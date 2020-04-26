import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import DetalleProducto from "./components/DetalleProducto";
import Login from "./components/Login";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />{" "}
    <Route exact path="/produco/:productoID/" component={DetalleProducto} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    {/*%<Route exact path="/signup/" component={Signup} />{" "}*/}
  </div>
);

export default BaseRouter;