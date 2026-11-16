import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { hexNut, machinedArc, machinedRing, ribbon, useMetals } from './metal'

const { damp } = THREE.MathUtils

interface Props {
  reduced: boolean
  /** the portrait card; the composition is laid out in its coordinate space */
  anchor: RefObject<HTMLElement>
}

/*
 * Coordinate space: the portrait card spans x,y ∈ [-1, 1] (it is square), z = 0.
 * Face/head safe zone in that space: |x| < 0.62 and y > -0.45. Nothing with z > 0
 * is ever placed inside it — only behind the card (z < 0, hidden by the depth mask)
 * or around the edges and lower corners.
 */

function useCard(anchor: RefObject<HTMLElement>, wrap: HTMLElement | null) {
  const { size, viewport } = useThree()
  const s = useMemo(() => ({ x: 0, y: 0, h: 1, ready: false }), [])
  useFrame(() => {
    const el = anchor.current
    if (!el || !wrap) return
    const a = el.getBoundingClientRect()
    const b = wrap.getBoundingClientRect()
    if (!a.width || !b.width) return
    const k = viewport.width / size.width
    s.x = (a.left + a.width / 2 - b.left - b.width / 2) * k
    s.y = -(a.top + a.height / 2 - b.top - b.height / 2) * k
    s.h = (a.width / 2) * k
    s.ready = true
  }, -1)
  return s
}

/** Depth-only rounded square matching the card, so metal behind it is hidden. */
function CardMask() {
  const geo = useMemo(() => {
    const r = 0.12
    const sh = new THREE.Shape()
    sh.moveTo(-1 + r, -1)
    sh.lineTo(1 - r, -1); sh.quadraticCurveTo(1, -1, 1, -1 + r)
    sh.lineTo(1, 1 - r); sh.quadraticCurveTo(1, 1, 1 - r, 1)
    sh.lineTo(-1 + r, 1); sh.quadraticCurveTo(-1, 1, -1, 1 - r)
    sh.lineTo(-1, -1 + r); sh.quadraticCurveTo(-1, -1, -1 + r, -1)
    return new THREE.ShapeGeometry(sh, 12)
  }, [])
  return (
    <mesh geometry={geo} renderOrder={-1}>
      <meshBasicMaterial colorWrite={false} />
    </mesh>
  )
}

function Studio({ reduced, live }: { reduced: boolean; live: boolean }) {
  const sweep = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (sweep.current && !reduced) sweep.current.position.x = Math.sin(s.clock.elapsedTime * 0.15) * 6
  })
  return (
    <Environment resolution={256} frames={live && !reduced ? Infinity : 1}>
      <color attach="background" args={['#aab3bd']} />
      <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 6, 1]} rotation-x={Math.PI / 2} scale={[14, 5, 1]} />
      <Lightformer form="rect" intensity={1.8} color="#fbfcfd" position={[0, 1, 9]} scale={[10, 3, 1]} />
      <Lightformer form="rect" intensity={3.5} color="#ffffff" position={[-5, 0, 3]} rotation-y={Math.PI / 2.4} scale={[0.6, 10, 1]} />
      <Lightformer form="rect" intensity={2.2} color="#dceaf5" position={[5, 0, 2]} rotation-y={-Math.PI / 2.4} scale={[0.8, 10, 1]} />
      <Lightformer ref={sweep as never} form="rect" intensity={2.5} color="#ffffff" position={[0, 2, -6]} scale={[1.2, 9, 1]} />
      {/* soft-blue bounce, the only colour in the rig */}
      <Lightformer form="rect" intensity={1.1} color="#91afc8" position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[14, 6, 1]} />
    </Environment>
  )
}

function Composition({ reduced, anchor, wrap, mobile }: Props & { wrap: HTMLElement | null; mobile: boolean }) {
  const c = useCard(anchor, wrap)
  const m = useMetals()
  const { pointer } = useThree()

  const geo = useMemo(() => ({
    halo: machinedArc(1.02, 1.1, 0.07, Math.PI * 1.55),
    ring: machinedRing(0.27, 0.33, 0.07),
    rib: ribbon({ radius: 0.62, width: 0.13, thickness: 0.012, twists: 1, segments: mobile ? 260 : 460 }),
    nut: hexNut(0.085, 0.042, 0.05),
  }), [mobile])

  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#dbe8f3', transmission: 0.92, thickness: 1.4, roughness: 0.06, ior: 1.52,
    clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.6, attenuationColor: '#91afc8', attenuationDistance: 0.9,
    specularIntensity: 1,
  }), [])

  const root = useRef<THREE.Group>(null)
  const back = useRef<THREE.Group>(null)
  const front = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Group>(null)
  const rib = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Group>(null)
  const prism = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)
  const intro = useRef(reduced ? 1 : 0)

  useFrame((state, dt) => {
    if (!c.ready || !root.current) return
    const t = reduced ? 0 : state.clock.elapsedTime
    const p = reduced ? 0 : Math.min(window.scrollY / window.innerHeight, 1.2)
    intro.current = damp(intro.current, 1, 1.6, dt) // gentle settle-in on load

    root.current.position.set(c.x, c.y, 0)
    root.current.scale.setScalar(c.h)

    const mx = reduced ? 0 : pointer.x
    const my = reduced ? 0 : pointer.y
    // depth-based parallax: the back layer drifts less than the front layer
    if (back.current) {
      back.current.position.x = damp(back.current.position.x, mx * 0.03, 3, dt)
      back.current.position.y = damp(back.current.position.y, my * 0.03 + p * 0.1, 3, dt)
    }
    if (front.current) {
      front.current.position.x = damp(front.current.position.x, mx * 0.08, 3, dt)
      front.current.position.y = damp(front.current.position.y, my * 0.06 + p * 0.35, 3, dt)
      front.current.scale.setScalar(0.85 + intro.current * 0.15)
    }

    if (halo.current) {
      halo.current.rotation.set(0.32 + my * 0.05, -0.5 + mx * 0.12 - p * 0.3, t * 0.06 + 0.4)
      halo.current.scale.setScalar(0.9 + intro.current * 0.1)
    }
    if (rib.current) rib.current.rotation.set(0.2, t * 0.08 + mx * 0.2, 0.3 + Math.sin(t * 0.2) * 0.05)
    if (ring.current) ring.current.rotation.set(1.05 + Math.sin(t * 0.3) * 0.08 + my * 0.1, 0.35 + mx * 0.25, t * 0.25)
    if (prism.current) prism.current.rotation.set(0.25, t * 0.22, 0.15)
    // small parts orbit on an ellipse that stays outside the card except at its outer corners
    if (orbit.current) orbit.current.rotation.z = t * 0.09
  })

  return (
    <group ref={root}>
      <CardMask />

      {/* ---- behind the photograph (z < 0) ---- */}
      <group ref={back}>
        <group ref={halo} position={[0.42, 0.38, -0.55]}>
          <mesh geometry={geo.halo} material={m.brushed} castShadow />
        </group>
        <group ref={rib} position={[-0.92, -0.55, -0.55]}>
          <mesh geometry={geo.rib} material={m.satin} />
        </group>
        <Float speed={reduced ? 0 : 0.9} floatIntensity={0.25} rotationIntensity={0.2}>
          <RoundedBox args={[0.06, 0.62, 0.06]} radius={0.012} smoothness={3} position={[-1.16, 0.35, -0.25]} rotation={[0, 0, 0.12]} material={m.brushed} />
        </Float>
      </group>

      {/* ---- in front of the photograph: lower corners and outer edges only ---- */}
      <group ref={front}>
        <Float speed={reduced ? 0 : 1} floatIntensity={0.35} rotationIntensity={0.15} floatingRange={[-0.04, 0.04]}>
          <group ref={ring} position={[-0.98, -0.88, 0.45]}>
            <mesh geometry={geo.ring} material={m.satin} castShadow />
          </group>
        </Float>
        <Float speed={reduced ? 0 : 1.3} floatIntensity={0.4} rotationIntensity={0.2} floatingRange={[-0.05, 0.05]}>
          <group ref={prism} position={[0.96, -0.8, 0.5]}>
            <mesh material={glass} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.34, 6, 1]} />
            </mesh>
          </group>
        </Float>
        <group ref={orbit} position={[0, 0, 0.3]}>
          <group position={[1.34, 0, 0]}>
            <mesh geometry={geo.nut} material={m.brushed} rotation={[0.5, 0.7, 0]} castShadow />
          </group>
          <group position={[-1.32, 0.15, 0]}>
            <mesh material={m.chrome} rotation={[0.2, 0, 0.5]} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.28, 24]} />
            </mesh>
          </group>
        </group>
      </group>

      {!mobile && (
        <ContactShadows position={[0, -1.18, 0]} opacity={0.22} scale={4} blur={2.4} far={0.9} resolution={512} color="#17243a" frames={reduced ? 1 : Infinity} />
      )}
    </group>
  )
}

export default function HeroScene({ reduced, anchor }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(true)
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    setEl(wrap.current)
    const node = wrap.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 10], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        frameloop={visible ? (reduced ? 'demand' : 'always') : 'never'}
        eventSource={document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.45} color="#ffffff" />
        <directionalLight position={[4, 6, 6]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -2, 3]} intensity={0.35} color="#dceaf5" />
        <Composition reduced={reduced} anchor={anchor} wrap={el} mobile={mobile} />
        <Studio reduced={reduced} live={!mobile} />
      </Canvas>
    </div>
  )
}
