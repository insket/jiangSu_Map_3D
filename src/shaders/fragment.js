export default /*glsl*/
`
        varying vec2 vUv;  
        uniform float ringWidth;
        uniform float innerRadius;
        uniform sampler2D uTexture; 
    
        void main() {
          float dist = distance(vUv - 0.5, vec2(0.0));
          float patternInner = step(innerRadius, dist*2.0);
          float patternOuter = step(1.0 - (innerRadius + ringWidth), 1.0 - dist*2.0);
          float pattern = patternInner * patternOuter;

          vec4 texture = texture2D(uTexture, vUv);
          gl_FragColor.rgba = vec4(pattern*texture.r*1.0, pattern*texture.g*1.0, pattern*texture.b*1.4, texture.b*pattern);
    }
`;
