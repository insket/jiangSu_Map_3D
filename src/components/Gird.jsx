import React, { useRef } from "react";
import { Instances, Instance, Text3D } from "@react-three/drei";
import "./lightSweep";
import { useFrame } from "@react-three/fiber";

export default function Gird() {
  const light = useRef();
  const ringWidth = 0.075;
  const T = Math.PI / 2;

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime() / 1;
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
        position={[-6, 2, -15]}
        rotation={[-Math.PI * 0.2, 0, 0]}
      >
        2023年上半年江苏省各市GDP总量 (亿元)
        <meshBasicMaterial color={"#3d3d3d"} />
      </Text3D>
    </>
  );
}
