import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Procedural brushed-metal grain: thousands of fine horizontal streaks of
 * varying length and value, tiled. Used as roughness + bump so highlights
 * stretch along the brushing direction like real machined aluminium.
 */
function makeBrushedTexture(size = 1024) {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size / 4
  const g = c.getContext('2d')!
  g.fillStyle = 'rgb(128,128,128)'
  g.fillRect(0, 0, c.width, c.height)
  for (let i = 0; i < 9000; i++) {
    const v = 96 + Math.floor(Math.random() * 70)
    g.strokeStyle = `rgba(${v},${v},${v},${0.25 + Math.random() * 0.5})`
    g.lineWidth = Math.random() < 0.85 ? 0.6 : 1.2
    const y = Math.random() * c.height
    const x = Math.random() * c.width
    const len = 40 + Math.random() * 420
    g.beginPath()
    g.moveTo(x, y)
    g.lineTo(x + len, y + (Math.random() - 0.5) * 0.6)
    g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 8
  t.colorSpace = THREE.NoColorSpace
  return t
}

let cached: THREE.CanvasTexture | null = null
const grain = () => (cached ??= makeBrushedTexture())

export interface Metals {
  brushed: THREE.MeshPhysicalMaterial
  satin: THREE.MeshPhysicalMaterial
  chrome: THREE.MeshPhysicalMaterial
  dark: THREE.MeshPhysicalMaterial
}

/** Shared, memoised metal finishes. */
export function useMetals(repeat: [number, number] = [2, 6]): Metals {
  return useMemo(() => {
    const tex = grain().clone()
    tex.needsUpdate = true
    tex.repeat.set(...repeat)

    const brushed = new THREE.MeshPhysicalMaterial({
      color: '#c9ccd1',
      metalness: 1,
      roughness: 0.34,
      roughnessMap: tex,
      bumpMap: tex,
      bumpScale: 0.6,
      anisotropy: 0.85,
      clearcoat: 0.15,
      clearcoatRoughness: 0.4,
      envMapIntensity: 1.25,
      side: THREE.DoubleSide,
    })
    const satin = new THREE.MeshPhysicalMaterial({
      color: '#b9bdc4',
      metalness: 1,
      roughness: 0.42,
      roughnessMap: tex,
      bumpMap: tex,
      bumpScale: 0.35,
      anisotropy: 0.6,
      envMapIntensity: 1.15,
      side: THREE.DoubleSide,
    })
    const chrome = new THREE.MeshPhysicalMaterial({
      color: '#eef0f3',
      metalness: 1,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1.4,
    })
    // anodised steel-blue accent, used sparingly
    const dark = new THREE.MeshPhysicalMaterial({
      color: '#3e5c7e',
      metalness: 0.9,
      roughness: 0.38,
      roughnessMap: tex,
      anisotropy: 0.5,
      envMapIntensity: 1,
    })
    return { brushed, satin, chrome, dark }
  }, [repeat[0], repeat[1]]) // eslint-disable-line react-hooks/exhaustive-deps
}

/* ---------- precision geometry ---------- */

/** A machined ring: extruded annulus with chamfered edges, centred on z. */
export function machinedRing(inner: number, outer: number, depth: number) {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false)
  const hole = new THREE.Path()
  hole.absarc(0, 0, inner, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  const bevel = Math.min((outer - inner) * 0.18, depth * 0.3)
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 160,
  })
  g.translate(0, 0, -depth / 2)
  g.computeVertexNormals()
  return g
}

/** A hex nut: extruded hexagon with a round bore and chamfers. */
export function hexNut(radius: number, bore: number, depth: number) {
  const shape = new THREE.Shape()
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const x = Math.cos(a) * radius
    const y = Math.sin(a) * radius
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }
  const hole = new THREE.Path()
  hole.absarc(0, 0, bore, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: depth * 0.12,
    bevelSize: radius * 0.06,
    bevelSegments: 2,
    curveSegments: 64,
  })
  g.translate(0, 0, -depth / 2)
  return g
}

/** Twisted solid metal ribbon swept along a closed 3D curve. */
export function ribbon({ radius = 1, width = 0.22, thickness = 0.018, twists = 1, segments = 480 } = {}) {
  class Loop extends THREE.Curve<THREE.Vector3> {
    constructor() { super() }
    getPoint(t: number, target = new THREE.Vector3()) {
      const a = t * Math.PI * 2
      return target.set(
        Math.sin(a) * radius,
        Math.sin(2 * a) * radius * 0.42,
        Math.cos(a) * radius * 0.55 + Math.sin(3 * a) * radius * 0.08,
      )
    }
  }
  const curve = new Loop()
  const frames = curve.computeFrenetFrames(segments, true)
  const pos: number[] = []
  const uv: number[] = []
  const idx: number[] = []
  const p = new THREE.Vector3()
  const w = new THREE.Vector3()
  const n = new THREE.Vector3()

  // four faces of the rectangular cross-section, built as separate strips for crisp edges
  const corners: [number, number][] = [[1, 1], [-1, 1], [-1, -1], [1, -1]]
  for (let f = 0; f < 4; f++) {
    const a = corners[f]
    const b = corners[(f + 1) % 4]
    const base = pos.length / 3
    for (let i = 0; i <= segments; i++) {
      const u = i / segments
      curve.getPointAt(u, p)
      const k = i % segments
      const th = u * Math.PI * 2 * twists
      w.copy(frames.normals[k]).multiplyScalar(Math.cos(th)).addScaledVector(frames.binormals[k], Math.sin(th))
      n.copy(frames.binormals[k]).multiplyScalar(Math.cos(th)).addScaledVector(frames.normals[k], -Math.sin(th))
      for (const c of [a, b]) {
        pos.push(
          p.x + w.x * c[0] * width / 2 + n.x * c[1] * thickness / 2,
          p.y + w.y * c[0] * width / 2 + n.y * c[1] * thickness / 2,
          p.z + w.z * c[0] * width / 2 + n.z * c[1] * thickness / 2,
        )
      }
      uv.push(u * 24, 0, u * 24, f % 2 === 0 ? 1 : 0.1)
    }
    for (let i = 0; i < segments; i++) {
      const s = base + i * 2
      idx.push(s, s + 1, s + 2, s + 1, s + 3, s + 2)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  g.setIndex(idx)
  g.computeVertexNormals()
  return g
}

/** An open machined arc (a ring with a gap), so its spin reads clearly. */
export function machinedArc(inner: number, outer: number, depth: number, sweep = Math.PI * 1.7) {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, outer, 0, sweep, false)
  shape.absarc(0, 0, inner, sweep, 0, true)
  shape.closePath()
  const bevel = Math.min((outer - inner) * 0.2, depth * 0.3)
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 160,
  })
  g.translate(0, 0, -depth / 2)
  return g
}
