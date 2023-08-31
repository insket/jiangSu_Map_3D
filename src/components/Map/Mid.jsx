import React from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { RGBELoader } from "three-stdlib";

export default function Mid({ baseHeight, midHeightScale, blocks }) {
  const config = {
    samples: 16,
    resolution: 1024,
    transmission: 1,
    thickness: 0.3,
    chromaticAberration: 0.3,
    anisotropy: 0.3,
    roughness: 0.6,
    ior: 1,
    color: "#d2ebff",
  };

  const background = useLoader(RGBELoader, "./umhlanga_sunrise_1k.hdr");

  const geometries = blocks.map((item) => item.children[0].geometry);
  const merged = useMemo(() => BufferGeometryUtils.mergeGeometries(geometries), [geometries]);
  return (
    <group rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]} position={[-8.2, 0.3, 5]} scale={[1.5,1.5,midHeightScale]}>
      <mesh geometry={merged}>
        <MeshTransmissionMaterial {...config} background={background} />
      </mesh>
    </group>
  );
}
