export default [
  {
    text: "Getting Started",
    expand: true,
    children: [
      { path: "/index", text: "Overview" },
      { path: "/concepts", text: "Concepts" },
    ],
  },

  {
    text: "Tutorials",
    children: [{ path: "/tutorial", text: "Basic" }],
  },

  {
    text: "Guides",
    children: [
      {
        text: "Editor",
        children: [
          { path: "/layout", text: "Layout" },
          { path: "/layers", text: "Layers" },
          { path: "/data", text: "Data" },
        ],
      },
      {
        text: "Playtesting",
        children: [
          { path: "/interface", text: "Interface" },
          { path: "/multiplayer", text: "Multiplayer" },
        ],
      },
      {
        text: "Automation",
        children: [
          { path: "/properties", text: "Properties" },
          { path: "/behaviors", text: "Behaviors" },
          { path: "/traits", text: "Traits" },
          { path: "/attributes", text: "Turn Orders" },
        ],
      },
    ],
  },
];
