export const VERTEX_SHADER = `
    varying vec2 vUv;
    uniform float hover;
    uniform float time;
    uniform vec2 intersect;

    uniform float hoverRadius;
    uniform float amplitude;
    uniform float speed;
    
    void main() {
        vUv = uv;
        vec4 _plane = modelMatrix * vec4(position, 1.0);

        if (hover > 0.0) {
            float _wave = hover * amplitude * sin(speed * (position.x + position.y + time));
            float _dist = length(uv - intersect);
            float _inCircle = 1. - (clamp(_dist, 0., hoverRadius) / hoverRadius);
            float _distort = _inCircle * _wave;
            
            _plane.z += _distort;
        }
        
        gl_Position = projectionMatrix * viewMatrix * _plane;
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
