import { memo } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Grid from "./Gird";
import Map from "./Map/Map"

export const Scene = () => {
  const MemoGrid = memo(Grid);

  return (
    <>
      <OrbitControls target={[2, 0, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={60} position={[0, 12, 16]} />

      <MemoGrid />

      <Map
					baseHeight={0.2}
					midHeightScale={4}
					topHeightScale={0.01}
					mapCenter={[117.39, 32.06]}
				/>
    </>
  );
};
