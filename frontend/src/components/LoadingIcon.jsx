// LoadingIcon: Animated spinner for loading state
import React from "react";

function LoadingIcon({ size = 32, color = "#a78bfa" }) {
  return (
    <span
      className="inline-block border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"
      style={{ width: size, height: size, borderTopColor: color }}
      aria-label="Loading"
    />
  );
}

export default LoadingIcon;
