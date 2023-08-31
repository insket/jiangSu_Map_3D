import React from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";
import JSJson from "../../../public/js.json";
import countJson from "../../../public/values_js";
import Base from "./Base";
import Mid from "./Mid";

const processing = (oriData, values) => {
  oriData.features.forEach((province) => {
    province.properties.value = values.features[province.properties.name];
    if (typeof province.geometry.coordinates[0][0][0] === "number") {
      const temp = province.geometry.coordinates[0];
      province.geometry.coordinates[0] = [temp];
    }
  });
  return oriData;
};

export default function map({ baseHeight, midHeightScale, topHeightScale, values, mapCenter }) {
  const json = JSJson;
  const cjson = countJson;
  const projection = d3.geoMercator().center(mapCenter).translate([0, 0]);
  const map = new THREE.Object3D();

  processing(json, cjson).features.forEach((element, index) => {
    const province = new THREE.Object3D();
    const coordinates = element.geometry.coordinates;

    coordinates.forEach((multiPolygon, index) => {
      multiPolygon.forEach((polygon) => {
        const shape = new THREE.Shape();
        const lineMaterial = new THREE.LineBasicMaterial({
          color: "#ffffff",
        });
        const lineGeometry = new THREE.BufferGeometry();

        const vertices = [];
        for (let i = 0; i < polygon.length; i++) {
          let x = null;
          let y = null;
          if (polygon[i] instanceof Array) {
            [x, y] = projection(polygon[i]);
            if (i === 0) {
              shape.moveTo(x, -y);
            }
            shape.lineTo(x, -y);
            vertices.push(x, -y, baseHeight * topHeightScale + 0.001);
          }
        }
        lineGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(vertices), 3)
        );

        const extrudeSettings = {
          depth: baseHeight,
          bevelEnabled: false,
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial();
        const material1 = new THREE.MeshBasicMaterial();
        const mesh = new THREE.Mesh(geometry, [material, material1]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        province.add(mesh);
        province.add(line);
      });
    });

    province.properties = element.properties;
    if (element.properties.contorid) {
      const [x, y] = projection(element.properties.contorid);
      province.properties._centroid = [x, y];
    }

    map.add(province);
  });
  return (
    <>
      <Base blocks={map.children} baseHeight={baseHeight} />

      <Mid blocks={map.children} baseHeight={baseHeight} midHeightScale={midHeightScale} />
    </>
  );
}
