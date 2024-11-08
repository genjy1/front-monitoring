<template>
  <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none">
    <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="4" stroke-linecap="round">
      <animate
        attributeName="stroke-dasharray"
        values="1,150;90,150;90,150"
        keyTimes="0;0.5;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dashoffset"
        values="0;-35;-125"
        keyTimes="0;0.5;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke"
        values="#3498db;#e74c3c;#f39c12;#2ecc71"
        keyTimes="0;0.25;0.5;0.75;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</template>
