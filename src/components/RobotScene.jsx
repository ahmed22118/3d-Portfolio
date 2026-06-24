import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function RobotScene({ className }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.4, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ----- Lighting -----
    const ambient = new THREE.AmbientLight(0x223344, 1.1)
    scene.add(ambient)

    const cyanLight = new THREE.PointLight(0x00e5ff, 6, 12)
    cyanLight.position.set(-3, 2, 3)
    scene.add(cyanLight)

    const violetLight = new THREE.PointLight(0x7c3aed, 5, 12)
    violetLight.position.set(3, -1, 2)
    scene.add(violetLight)

    const rim = new THREE.DirectionalLight(0x88e6ff, 0.6)
    rim.position.set(0, 3, -4)
    scene.add(rim)

    // ----- Robot group -----
    const robot = new THREE.Group()
    scene.add(robot)

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0b1422,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x00161c,
    })
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.4,
      metalness: 0.3,
      roughness: 0.4,
    })

    // Head
    const head = new THREE.Group()
    const headCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 1), bodyMat)
    headCore.scale.set(1, 0.92, 0.95)
    head.add(headCore)

    // Visor band
    const visor = new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.07, 16, 60, Math.PI * 1.15),
      new THREE.MeshStandardMaterial({ color: 0x041018, metalness: 0.9, roughness: 0.2 })
    )
    visor.rotation.set(Math.PI / 2, 0, Math.PI * 0.07)
    visor.position.set(0, 0.05, 0.55)
    head.add(visor)

    // Eyes (glow + blink via scale on Y)
    const eyeGeo = new THREE.SphereGeometry(0.135, 24, 24)
    const eyeL = new THREE.Mesh(eyeGeo, accentMat)
    const eyeR = new THREE.Mesh(eyeGeo, accentMat)
    eyeL.position.set(-0.34, 0.02, 0.92)
    eyeR.position.set(0.34, 0.02, 0.92)
    head.add(eyeL, eyeR)

    const eyeGlowL = new THREE.PointLight(0x00e5ff, 1.4, 2)
    eyeGlowL.position.copy(eyeL.position)
    const eyeGlowR = new THREE.PointLight(0x00e5ff, 1.4, 2)
    eyeGlowR.position.copy(eyeR.position)
    head.add(eyeGlowL, eyeGlowR)

    // ----- Personalized features: skin tone, glasses, hair, beard -----

    // Warm face plate behind the visor — suggests skin tone in the gap between eyes/visor
    const faceMat = new THREE.MeshStandardMaterial({
      color: 0xb9794f,
      roughness: 0.55,
      metalness: 0.05,
      emissive: 0x150d07,
    })
    const facePlate = new THREE.Mesh(new THREE.SphereGeometry(0.78, 24, 24), faceMat)
    facePlate.scale.set(0.92, 0.95, 0.55)
    facePlate.position.set(0, -0.05, 0.42)
    head.add(facePlate)

    // Round gold wire-frame glasses (rounder + slightly larger lenses, warmer gold)
    const glassesMat = new THREE.MeshStandardMaterial({
      color: 0xd4af72,
      metalness: 0.9,
      roughness: 0.2,
    })
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.16,
      roughness: 0.08,
      transmission: 0.65,
      metalness: 0,
    })

    const glassesGroup = new THREE.Group()
    const lensGeo = new THREE.TorusGeometry(0.225, 0.022, 12, 28)
    const lensFillGeo = new THREE.CircleGeometry(0.225, 28)

    const lensL = new THREE.Mesh(lensGeo, glassesMat)
    lensL.position.set(-0.34, 0.03, 0.97)
    const lensFillL = new THREE.Mesh(lensFillGeo, lensMat)
    lensFillL.position.copy(lensL.position)

    const lensR = new THREE.Mesh(lensGeo, glassesMat)
    lensR.position.set(0.34, 0.03, 0.97)
    const lensFillR = new THREE.Mesh(lensFillGeo, lensMat)
    lensFillR.position.copy(lensR.position)

    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.14, 8), glassesMat)
    bridge.rotation.z = Math.PI / 2
    bridge.position.set(0, 0.04, 0.995)

    const templeL = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.32, 8), glassesMat)
    templeL.rotation.z = Math.PI / 2.3
    templeL.position.set(-0.57, 0.02, 0.76)
    const templeR = templeL.clone()
    templeR.position.set(0.57, 0.02, 0.76)
    templeR.rotation.z = -Math.PI / 2.3

    glassesGroup.add(lensL, lensFillL, lensR, lensFillR, bridge, templeL, templeR)
    head.add(glassesGroup)

    // Hair — fuller, dark, wavy volume swept up and back, with short side volume
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x14110f, roughness: 0.6, metalness: 0.08 })
    const hairGroup = new THREE.Group()
    const hairTufts = [
      // top crown — bigger swept volume
      [0, 0.78, -0.02, 0.4, 0.26, 0.36],
      [-0.18, 0.82, 0.1, 0.3, 0.24, 0.3],
      [0.18, 0.82, 0.1, 0.3, 0.24, 0.3],
      // sides, fuller down toward temples
      [-0.42, 0.6, 0.12, 0.28, 0.26, 0.3],
      [0.42, 0.6, 0.12, 0.28, 0.26, 0.3],
      // front fringe, swept back off the forehead
      [0, 0.66, 0.5, 0.3, 0.2, 0.24],
      [-0.22, 0.6, 0.46, 0.22, 0.18, 0.2],
      [0.22, 0.6, 0.46, 0.22, 0.18, 0.2],
      // slight back volume
      [0, 0.7, -0.35, 0.32, 0.24, 0.3],
    ]
    hairTufts.forEach(([x, y, z, sx, sy, sz]) => {
      const tuft = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 1), hairMat)
      tuft.position.set(x, y, z)
      tuft.scale.set(sx, sy, sz)
      tuft.rotation.set(Math.random() * 0.3, Math.random() * 0.3, Math.random() * 0.3)
      hairGroup.add(tuft)
    })
    head.add(hairGroup)

    // Fuller beard — covers jaw and cheeks, not just the chin
    const beardMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.65, metalness: 0.04 })
    const beard = new THREE.Mesh(new THREE.SphereGeometry(0.66, 22, 22), beardMat)
    beard.scale.set(1.05, 0.66, 0.78)
    beard.position.set(0, -0.4, 0.3)
    head.add(beard)

    const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), beardMat)
    cheekL.scale.set(0.8, 0.9, 0.55)
    cheekL.position.set(-0.52, -0.12, 0.5)
    const cheekR = cheekL.clone()
    cheekR.position.set(0.52, -0.12, 0.5)
    head.add(cheekL, cheekR)

    // Antenna
    const antennaStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8),
      bodyMat
    )
    antennaStem.position.set(0, 1.15, 0)
    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), accentMat)
    antennaTip.position.set(0, 1.45, 0)
    head.add(antennaStem, antennaTip)

    robot.add(head)
    head.position.y = 0.55

    // Neck joint
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.25, 16), bodyMat)
    neck.position.y = -0.35
    head.add(neck)

    // Body / shoulders
    const torso = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.85, 0.9, 8, 16),
      bodyMat
    )
    torso.position.y = -1.35
    torso.scale.set(1, 0.85, 0.8)
    robot.add(torso)

    const chestLine = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.025, 8, 40, Math.PI),
      accentMat
    )
    chestLine.position.set(0, -1.05, 0.55)
    chestLine.rotation.set(Math.PI / 2.2, 0, 0)
    robot.add(chestLine)

    robot.scale.setScalar(1.05)
    robot.position.y = 0.2

    // ----- Cursor tracking -----
    const targetRot = { x: 0, y: 0 }
    const currentRot = { x: 0, y: 0 }

    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      targetRot.y = nx * 0.55
      targetRot.x = ny * 0.32
    }
    window.addEventListener('pointermove', onPointerMove)

    // ----- Blink cycle -----
    let blinkTimer = 0
    let nextBlinkAt = 2 + Math.random() * 3
    let blinkPhase = 0 // 0 = open

    const clock = new THREE.Clock()
    let frameId

    const animate = () => {
      const dt = clock.getDelta()
      const t = clock.getElapsedTime()

      if (!reduced) {
        // idle float
        robot.position.y = 0.2 + Math.sin(t * 0.9) * 0.12
        robot.rotation.z = Math.sin(t * 0.6) * 0.02

        // smooth head tracking
        currentRot.x += (targetRot.x - currentRot.x) * 0.08
        currentRot.y += (targetRot.y - currentRot.y) * 0.08
        head.rotation.x = currentRot.x
        head.rotation.y = currentRot.y

        // blink
        blinkTimer += dt
        if (blinkTimer > nextBlinkAt) {
          blinkPhase += dt * 14
          const s = Math.max(0.05, Math.abs(Math.cos(blinkPhase)))
          eyeL.scale.y = s
          eyeR.scale.y = s
          if (blinkPhase > Math.PI) {
            blinkPhase = 0
            blinkTimer = 0
            nextBlinkAt = 2.5 + Math.random() * 3.5
            eyeL.scale.y = 1
            eyeR.scale.y = 1
          }
        }

        // light pulse
        const pulse = 1.2 + Math.sin(t * 2.2) * 0.3
        eyeGlowL.intensity = pulse
        eyeGlowR.intensity = pulse
        cyanLight.position.x = -3 + Math.sin(t * 0.4) * 0.6
        violetLight.position.x = 3 + Math.cos(t * 0.4) * 0.6
      }

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frameId)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
