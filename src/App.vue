<script setup></script>

<template>
  <n-config-provider>
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <RouterLink class="site-brand" to="/" aria-label="返回首页">
              <span class="site-brand__text">peeeng</span>
            </RouterLink>
            <RouterView />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="less">
.site-brand {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: block;
  overflow: visible;
  padding: 1.2rem clamp(1.25rem, 4vw, 3rem) 1.15rem;
  color: #fff;
  text-decoration: none;
  user-select: none;
  transition: opacity 0.22s ease;
}

.site-brand__text {
  display: inline-block;
  overflow: visible;
  padding: 0.04em 0.02em 0.1em;
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.site-brand:hover {
  opacity: 0.72;
}
</style>
