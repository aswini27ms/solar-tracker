import React from "react";
import Lottie from "lottie-react";
import alertAnimation from "../assets/animations/alert.json";

const AlertAnimation: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className || "w-32 h-32 mx-auto"}>
    <Lottie animationData={alertAnimation} loop={true} />
  </div>
);

export default AlertAnimation;
