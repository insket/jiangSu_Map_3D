import React from "react";
import { Text3D, Html, Edges } from "@react-three/drei";

export default function Top({
  baseHeight,
  midHeightScale,
  topHeightScale,
  blocks,
  values,
  mapCenter,
}) {
  const scale = 3.15;

  const textConfig = {
    curveSegments: 32,
    bevelEnabled: true,
    bevelSize: 0,
    bevelThickness: 0,
    height: 0.02,
    letterSpacing: 0,
    size: 0.25,
  };

  const config = {
    color: "#9cb8e4",
    clearcoat: 0.5,
    reflectivity: 0.15,
    ior: 1.3,
  };
  return (
    <>
      <group
        rotation={[0, Math.PI * 1.1, Math.PI]}
        position-y={baseHeight + midHeightScale * baseHeight + 0.01}
      >
        {blocks.map((item, index) => (
          <group key={"city_" + index}>
            <Text3D
              font={"./MFTianLiNoncommercial_Regular.json"}
              position={[
                (item.properties.centroid[0] - mapCenter[0] - 2.4) * 3.9,
                -0.1,
                (item.properties.centroid[1] - mapCenter[1] -0.6) * 4.5,
                ,
              ]}
              rotation={[-Math.PI * 0.5, Math.PI, Math.PI]}
              {...textConfig}
            >
              {item.properties.name}
              <meshBasicMaterial color={"#ffffff"} transparent />
            </Text3D>
          </group>
        ))}
      </group>

      <group
        rotation={[-Math.PI * 0.5, 0, Math.PI * 0.09]}
        position={[-8.2, baseHeight + midHeightScale * baseHeight + 0.1, 5]}
      >
        {blocks.map((item, index) => (
          <group key={"top_" + index}>
            <mesh scale={[1.5, 1.5, topHeightScale]} geometry={blocks[index].children[0].geometry}>
              <meshPhysicalMaterial
                {...config}
                transmission={Math.sqrt(
                  item.properties.value / Math.max(...Object.values(values.features))
                )}
                roughness={Math.sqrt(
                  item.properties.value / Math.max(...Object.values(values.features))
                )}
              />
              <Edges color={"#ffffff"} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}
