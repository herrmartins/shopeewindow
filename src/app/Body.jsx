"use client";

import React from "react";
import { useState } from "react";
import products from "./data.js";
import CategoryBand from "./components/categories/CategoryBand.jsx";

function Body() {
  return (
    <>
      <div className="flex">
        <div className="w-full">
          <CategoryBand />
        </div>
      </div>
    </>
  );
}

export default Body;
