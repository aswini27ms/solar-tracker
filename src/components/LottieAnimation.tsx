import React from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationData: object;
  className?: string;
  loop?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, className = "", loop = true }) => {
  return <Lottie animationData={animationData} loop={loop} className={className} />;
};

export default LottieAnimation;
