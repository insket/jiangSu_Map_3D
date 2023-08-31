import { memo } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Grid from "./Gird";

export const Scene = () => {
  const MemoGrid = memo(Grid);

  return (
    <>
      <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={60} position={[0, 12, 16]} />

      <MemoGrid />
    </>
  );
};
