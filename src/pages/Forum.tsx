import React from "react";

const Forum = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, overflow: "hidden" }}>
      <iframe
        src="http://localhost:8081/"
        title="Forum"
        style={{
          border: "none",
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          display: "block",
        }}
        allowFullScreen
      />
    </div>
  );
};

export default Forum;