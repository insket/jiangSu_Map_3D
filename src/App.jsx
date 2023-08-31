import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";

function App() {
  return (
    <Canvas shadows >
      <color attach="background" args={["#ffffff"]} />
      <Scene />
    </Canvas>
  );
}

export default App;