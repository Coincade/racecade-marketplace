"use client";
import React, { useState, useContext, useEffect } from "react";

const Sidebar = ({ setFilter }) => {
  const [expanded, setExpanded] = useState({
    class: false,
    stats: false,
    skin: false,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  //  console.log('Car Class1', carss?.attributes?.[1]?.value)

  return (
    <div className="w-64 h-screen bg-[#24252D] text-white p-4 space-y-4 border-white border">
      <h2 className="text-2xl font-semibold mb-6">Heading</h2>

      {/* Class Section */}
      <div>
        <button
          onClick={() => toggleSection("class")}
          className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-600"
        >
          Class
        </button>
        {expanded.class && (
          <div className="ml-4 mt-2 space-y-2">
            <button
              onClick={() => setFilter("all")}
              className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A]  hover:bg-gray-500"
            >
              All
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500"
              onClick={() => setFilter("S")}
            >
              S
            </button>
            <button
              className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500"
              onClick={() => setFilter("A")}
            >
              A
            </button>
            <button
              className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500"
              onClick={() => setFilter("B")}
            >
              B
            </button>
            <button
              className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500"
              onClick={() => setFilter("C")}
            >
              C
            </button>
            <button
              className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500"
              onClick={() => setFilter("F")}
            >
              F
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div>
        <button
          onClick={() => toggleSection("stats")}
          className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-600"
        >
          Stats
        </button>
        {expanded.stats && (
          <div className="ml-4 mt-2 space-y-2">
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option A
            </button>
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option B
            </button>
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option C
            </button>
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option S
            </button>
          </div>
        )}
      </div>

      {/* Skin Section */}
      <div>
        <button
          onClick={() => toggleSection("skin")}
          className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-600"
        >
          Skin
        </button>
        {expanded.skin && (
          <div className="ml-4 mt-2 space-y-2">
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option A
            </button>
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option B
            </button>
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option C
            </button>
            <button className="w-full text-left px-2 py-1 rounded bg-[#2A2D3A] hover:bg-gray-500">
              Option S
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
