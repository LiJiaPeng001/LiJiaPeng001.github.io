<script setup>
const router = useRouter()

const marqueeText = Array.from({ length: 14 }, () => 'peeeng').join(' · ')
const rows = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  reverse: index % 2 === 1,
  duration: `${26 + (index % 5) * 3}s`,
}))

function goPanorama() {
  router.push('/360')
}
</script>

<template>
  <section class="home" aria-label="个人站首页">
    <div class="home__fx" aria-hidden="true">
      <div class="home__field">
        <div v-for="row in rows" :key="row.id" class="home__marquee">
          <div
            class="home__track"
            :class="{ 'home__track--reverse': row.reverse }"
            :style="{ animationDuration: row.duration }"
          >
            <span>{{ marqueeText }}</span>
            <span>{{ marqueeText }}</span>
          </div>
        </div>
      </div>
      <div class="home__veil"></div>
    </div>

    <header class="home__nav">
      <p class="home__brand">peeeng</p>
    </header>

    <div class="home__stage">
      <h1 class="home__title">这是我的个人站</h1>
      <p class="home__desc">放作品、记想法，偶尔做一点小小的实验。</p>
      <div class="home__cta">
        <button type="button" class="home__btn home__btn--solid" @click="goPanorama">
          逛逛 360° 全景
        </button>
        <a
          class="home__btn home__btn--ghost"
          href="https://github.com/LiJiaPeng001"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
.home {
  --bg: #000;
  --fg: #fff;
  --muted: rgba(255, 255, 255, 0.58);
  --line: rgba(255, 255, 255, 0.22);

  position: relative;
  height: 100dvh;
  min-height: 100vh;
  overflow: hidden;
  color: var(--fg);
  background: var(--bg);
  font-family: 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}

.home__fx {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.home__field {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.08em;
  padding: 0.2em 0;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.22);
  font-size: clamp(2.4rem, 6.2vw, 4.8rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: lowercase;
  user-select: none;
  transform: translate(-50%, -50%) rotate(-6deg);
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 14%,
    rgba(0, 0, 0, 0.85) 36%,
    #000 50%,
    rgba(0, 0, 0, 0.85) 64%,
    rgba(0, 0, 0, 0.35) 86%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 14%,
    rgba(0, 0, 0, 0.85) 36%,
    #000 50%,
    rgba(0, 0, 0, 0.85) 64%,
    rgba(0, 0, 0, 0.35) 86%,
    transparent 100%
  );
}

.home__marquee {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  overflow: visible;
  white-space: nowrap;
}

.home__track {
  display: inline-flex;
  width: max-content;
  will-change: transform;
  animation: home-marquee 28s linear infinite;
}

.home__track--reverse {
  animation-direction: reverse;
}

.home__track span {
  display: inline-block;
  padding-right: 1.1em;
}

.home__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 62% 48% at 50% 48%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.72) 75%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 22%, transparent 78%, rgba(0, 0, 0, 0.55) 100%);
}

.home__nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 1.35rem clamp(1.25rem, 4vw, 3rem);
}

.home__brand {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  animation: home-fade 1s ease both;
}

.home__stage {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 5rem 1.5rem 4rem;
  text-align: center;
}

.home__title {
  margin: 0;
  max-width: 16em;
  font-size: clamp(2.4rem, 6.5vw, 4.4rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.08em;
  animation: home-fade-up 1s ease 0.08s both;
}

.home__desc {
  margin: 1.35rem 0 0;
  max-width: 26rem;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 300;
  line-height: 1.8;
  color: var(--muted);
  letter-spacing: 0.04em;
  animation: home-fade-up 1s ease 0.18s both;
}

.home__cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-top: 2.2rem;
  animation: home-fade-up 1s ease 0.28s both;
}

.home__btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 9.5rem;
  padding: 0.78rem 1.35rem;
  border-radius: 999px;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    opacity 0.25s ease;
}

.home__btn--solid {
  border: 1px solid var(--fg);
  background: var(--fg);
  color: #000;
}

.home__btn--solid:hover {
  opacity: 0.88;
}

.home__btn--ghost {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--fg);
}

.home__btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.06);
}

@keyframes home-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes home-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes home-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home__track {
    animation: none;
  }

  .home__brand,
  .home__title,
  .home__desc,
  .home__cta {
    animation: none;
  }

  .home__btn {
    transition: none;
  }
}
</style>
