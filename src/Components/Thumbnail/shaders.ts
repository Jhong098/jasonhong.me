export const VERTEX_SHADER = `
    varying vec2 vUv;
    uniform float hover;
    uniform float time;
    uniform vec2 intersect;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);;
    }
`;

export const FRAGMENT_SHADER = `
    uniform sampler2D texture;
    uniform vec2 ratio;

    varying vec2 vUv;

    void main(){
    
        vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );

        gl_FragColor = texture2D(texture, uv);
    }
`;
