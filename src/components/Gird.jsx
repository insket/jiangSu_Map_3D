import React, { useRef } from "react";
import { Instances, Instance, Text3D } from "@react-three/drei";
import "./lightSweep";
import { useFrame } from "@react-three/fiber";

export default function Gird() {
  const light = useRef();
  const ringWidth = 0.075;
  const T = Math.PI / 2;

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime() / 2;
    const stage = (elapsedTime / T) % 2;

    if (stage < 1)
      light.current.material.uniforms.innerRadius.value = 3.5 * Math.abs(Math.sin(elapsedTime));
    else light.current.material.uniforms.innerRadius.value = 0;
    light.current.material.uniforms.ringWidth.value = ringWidth;
  });
  return (
    <>
      <mesh ref={light} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <lightSweepMaterial />
      </mesh>

      <Text3D
        font={"./MFTianLiNoncommercial_Regular.json"}
        position={[-12, 2, -15]}
        rotation={[-Math.PI * 0.2, 0, 0]}
      >
        江苏省市地图3D
        <meshBasicMaterial color={"#3d3d3d"} />
      </Text3D>

      <Instances position={[0, -0.01, 0]} scale={2}>
				<planeGeometry args={[0.026, 0.2]} />
				<meshBasicMaterial color="#999" />
				{Array.from({ length: 23 }, (_, y) =>
					Array.from({ length: 23 }, (_, x) => (
						<group
							key={x + ':' + y}
							position={[x * 2 - Math.floor(23 / 2) * 2, -0.01, y * 2 - Math.floor(23 / 2) * 2]}
						>
							<Instance rotation={[-Math.PI / 2, 0, 0]} />
							<Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
						</group>
					))
				)}
				<gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
			</Instances>
    </>
  );
}
