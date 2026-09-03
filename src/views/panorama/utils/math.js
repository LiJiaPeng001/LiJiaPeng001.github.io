export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

/** 帧率无关的指数平滑系数 */
export function smoothFollowFactor(smooth, dt) {
  return 1 - Math.exp(-smooth * dt)
}
