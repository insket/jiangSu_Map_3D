import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from "../shaders/vertex";
import fragmentShader from "../shaders/fragment";

const LightSweepMaterial = shaderMaterial(
  {
    transparent: true,
    ringWidth: 0,
    innerRadius: 0,
    uTexture: new THREE.TextureLoader().load("./texture.jpg"),
  },
  // vertex shader
  vertexShader,

  //  fragment shander
  fragmentShader
);
extend({ LightSweepMaterial });
