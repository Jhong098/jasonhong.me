/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import {
  PerspectiveCamera,
  Mesh,
  WebGLRenderer,
  Scene,
  DoubleSide,
  Color,
  Raycaster,
  ShaderMaterial,
  Vector2,
  PlaneBufferGeometry,
  TextureLoader,
  RepeatWrapping,
  LinearFilter,
  Uniform
} from "three";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shaders";
import { TweenMax, TimelineMax } from "gsap";
import { GUI } from "dat.gui";

const TEXTURE_PATH =
  "https://images.unsplash.com/photo-1565531152238-5f20a0f4a3f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
const FOV = 50;
const CAMERA_DISTANCE = 50;
const PLANE_WIDTH_SEGMENTS = 30;
const PLANE_ASPECT_RATIO = 9 / 16;
let INTERSECTED;

const getVisibleDimensionsAtZDepth = (depth, camera) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  const visibleWidth = visibleHeight * camera.aspect;

  return {
    visibleHeight,
    visibleWidth
  };
};

export default class Plane {
  uv: Uniform;
  mouse: any;
  time: Uniform;
  mouseCoordinates: HTMLElement;
  uvCoordinates: HTMLElement;
  aspect: number;
  camera: PerspectiveCamera;
  scene: Scene;
  raycaster: Raycaster;
  renderer: WebGLRenderer;
  plane: Mesh;
  constructor() {
    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.updateIntersected = this.updateIntersected.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.uv = new Uniform(new Vector2(0, 0));
    this.mouse = {};
    this.time = new Uniform(0);

    this.init();

    // variables for logging info, ignore these
    this.mouseCoordinates = document.getElementById("mouse");
    this.uvCoordinates = document.getElementById("uv");
  }

  async init() {
    const { innerWidth, innerHeight } = window;

    this.aspect = innerWidth / innerHeight;
    this.camera = new PerspectiveCamera(FOV, this.aspect, 1, 1000);
    this.camera.position.z = CAMERA_DISTANCE;

    this.scene = new Scene();
    this.scene.background = new Color("#000f14");

    this.raycaster = new Raycaster();

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true
    });

    document.body.appendChild(this.renderer.domElement);

    this.plane = await this.createPlane();

    this.scene.add(this.plane);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(this.animate);

    window.addEventListener("mousemove", this.handleMousemove);
    window.addEventListener("resize", this.handleResize);
  }

  animate() {
    this.time.value = this.time.value + (0.05 % 1);
    this.renderer.render(this.scene, this.camera);
  }

  async handleResize(e) {
    const { innerWidth: width, innerHeight: height } = window;
    this.renderer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.scene.remove(this.plane);
    this.plane = await this.createPlane();
    this.scene.add(this.plane);

    this.animate();
  }

  async createPlane() {
    let texture;
    try {
      texture = await new TextureLoader().load(TEXTURE_PATH, t => {
        t.wrapT = t.wrapS = RepeatWrapping;
        t.anisotropy = 0;
        t.magFilter = LinearFilter;
        t.minFilter = LinearFilter;
      });
    } catch (e) {
      console.log(e);
    }

    const { visibleWidth, visibleHeight } = getVisibleDimensionsAtZDepth(
      0,
      this.camera
    );

    const planeWidth = visibleWidth / 2;
    const planeHeight = planeWidth * PLANE_ASPECT_RATIO;

    // texture dimensions
    const textureWidth = 2126;
    const textureHeight = 1393;
    const ratio = new Vector2(
      Math.min(planeWidth / planeHeight / (textureWidth / textureHeight), 1.0),
      Math.min(planeHeight / planeWidth / (textureHeight / textureWidth), 1.0)
    );

    const planeMaterial = new ShaderMaterial({
      uniforms: {
        hover: { type: "f", value: 0.0 },
        texture: { type: "t", value: texture },
        time: this.time,
        intersect: this.uv,
        ratio: { type: "v2", value: ratio },
        hoverRadius: { type: "f", value: 0.35 },
        speed: { type: "f", value: 1.5 },
        amplitude: { type: "f", value: 10 },
        xMultiplier: { type: "f", value: 0.4 },
        yMultiplier: { type: "f", value: 0.4 }
      },
      side: DoubleSide,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER
    });

    const planeGeometry = new PlaneBufferGeometry(
      planeWidth,
      planeHeight,
      PLANE_WIDTH_SEGMENTS,
      Math.round(PLANE_WIDTH_SEGMENTS * PLANE_ASPECT_RATIO)
    );

    return new Mesh(planeGeometry, planeMaterial);
  }

  handleMousemove(e) {
    // code to get normalized device coordinates
    const { clientX, clientY } = e;
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    // ignore this
    this.mouseCoordinates.innerHTML = `(${this.mouse.x.toFixed(
      3
    )}, ${this.mouse.y.toFixed(3)})`; // ignore this

    this.updateIntersected();
  }

  updateIntersected() {
    // raycaster code from the THREE.js docs
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObject(this.plane, false);

    if (intersects.length > 0) {
      document.body.style.cursor = "pointer"; // manually set our cursor style to reflect the hover state

      const intersectedPlane = intersects[0].object;

      if (INTERSECTED !== intersectedPlane) {
        // hovering over the plane for the first time
        INTERSECTED = intersectedPlane;

        new TimelineMax()
          .to(
            (<any>intersectedPlane).material.uniforms.hover,
            0.35,
            { value: 1.0 },
            0
          )
          .to(intersectedPlane.scale, 0.25, { x: 1.05, y: 1.05 }, 0);
      }

      // ignore this
      this.uvCoordinates.innerHTML = `(
        ${intersects[0].uv.x.toFixed(3)},
        ${intersects[0].uv.y.toFixed(3)}
      )`;

      // hovering over the same plane
      this.uv.value.x = intersects[0].uv.x;
      this.uv.value.y = intersects[0].uv.y;

      const { x = 0, y = 0 } = this.mouse;

      TweenMax.to(intersectedPlane.position, 0.35, {
        x: x,
        y: y
      });
    } else {
      // no intersections
      document.body.style.cursor = "auto";
      if (INTERSECTED) {
        new TimelineMax()
          .to(INTERSECTED.position, 0.35, { x: 0, y: 0 }, 0)
          .to(INTERSECTED.scale, 0.35, { x: 1, y: 1 }, 0)
          .to(INTERSECTED.material.uniforms.hover, 0.35, { value: 0.0 }, 0);

        INTERSECTED = null;

        // ignore this
        this.uvCoordinates.innerHTML = "";
      }
    }
  }
}
