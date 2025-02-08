import { useRef, useState } from "react";
import { getUser } from "../actions/userActions";
import useGlobalContext from "../hooks/useGlobalContext";
function ChoreWheel() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const { dispatch } = useGlobalContext();

  const handleWheelClick = () => {
    console.log("Wheel clicked");
    getUser()(dispatch);
    let startTime: number;
    const duration = 1000; // 5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < duration) {
        const newRotation = (elapsed / duration) * 360; // Gradually rotate from 0 to 360 degrees
        setRotation(newRotation);
        requestAnimationFrame(animate);
      } else {
        setRotation(360); // Ensure it stops at a full rotation
      }
    };
    requestAnimationFrame(animate);
  };

  const items = [
    "Joshua Clean Dishes",
    "Austin Take Out Trash",
    "Aditi Clean Bathroom",
    "Jeremy Clean Floors",
  ];

  const choreWheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0s linear",
  };

  return (
    <>
      <div
        onClick={handleWheelClick}
        ref={containerRef}
        className="w-12 h-12 rounded-full overflow-hidden"
        style={choreWheelStyle}
      >
        {Array.from(items).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{
              clipPath: `polygon(50% 50%, ${
                50 + 100 * Math.cos((i * (360 / items.length) * Math.PI) / 180)
              }% ${
                50 + 100 * Math.sin((i * (360 / items.length) * Math.PI) / 180)
              }%, ${
                50 +
                100 * Math.cos(((i + 1) * (360 / items.length) * Math.PI) / 180)
              }% ${
                50 +
                100 * Math.sin(((i + 1) * (360 / items.length) * Math.PI) / 180)
              }%)`,
              backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
            }}
          >
            <span
              className="absolute text-white font-bold"
              style={{
                top: `calc(50% + ${
                  30 *
                  Math.sin(((i + 0.5) * (360 / items.length) * Math.PI) / 180)
                }%)`,
                left: `calc(50% + ${
                  30 *
                  Math.cos(((i + 0.5) * (360 / items.length) * Math.PI) / 180)
                }%)`,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                width: "50px",
              }}
            >
              {/* {items[i]} */}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChoreWheel;
