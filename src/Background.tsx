import { useEffect, useRef } from 'react'
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!, cx = cv.getContext('2d')!
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches
    let W = 0, H = 0, mx = -999, my = -999, raf = 0
    let pts: { x: number; y: number; vx: number; vy: number }[] = []
    const rs = () => {
      W = cv.width = innerWidth; H = cv.height = innerHeight
      pts = Array.from({ length: Math.min(70, (W / 18) | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }))
    }
    const mm = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const line = (a: number, b: number, c: number, d: number, col: string) => { cx.strokeStyle = col; cx.beginPath(); cx.moveTo(a, b); cx.lineTo(c, d); cx.stroke() }
    const draw = () => {
      cx.clearRect(0, 0, W, H)
      const g = cx.createRadialGradient(W * .8, H * .1, 0, W * .8, H * .1, H * .7)
      g.addColorStop(0, 'rgba(139,92,246,.16)'); g.addColorStop(1, 'transparent'); cx.fillStyle = g; cx.fillRect(0, 0, W, H)
      pts.forEach((p, i) => {
        if (!still) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }
        cx.fillStyle = 'rgba(34,211,238,.7)'; cx.fillRect(p.x, p.y, 2, 2)
        for (let j = i + 1; j < pts.length; j++) { const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 120) line(p.x, p.y, q.x, q.y, `rgba(59,130,246,${.22 * (1 - d / 120)})`) }
        const dm = Math.hypot(p.x - mx, p.y - my); if (dm < 160) line(p.x, p.y, mx, my, `rgba(34,211,238,${.5 * (1 - dm / 160)})`)
      })
      if (!still) raf = requestAnimationFrame(draw)
    }
    rs(); draw(); addEventListener('resize', rs); addEventListener('mousemove', mm)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); removeEventListener('mousemove', mm) }
  }, [])
  return <canvas id="bg" ref={ref} aria-hidden="true" />
}
