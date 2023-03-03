<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <header class="header">
    <div class="header__container">
      <RouterLink class="header__logo" :to="{ name: 'home' }"><span>my</span> wheather</RouterLink>
    </div>
  </header>
  <main class="page">
    <section class="main-block">
      <div class="main-block__container">
        <div class="main-block__nav">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink :to="{ name: 'favorite' }">Favorite</RouterLink>
        </div>
        <RouterView v-slot="{ Component }">
          <KeepAlive exclude="FavoriteView">
            <component :is="Component"></component>
          </KeepAlive>
        </RouterView>
      </div>
    </section>
  </main>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__copy">
        <span>© 2023</span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.header {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  background: var(--darkColor);
  // .header__logo
  &__logo {
    display: inline-block;
    font-size: 30px;
    line-height: 133.333333%; /* 40/30 */
    text-transform: uppercase;
    span {
      color: var(--lightGreenColor);
    }
  }
}
.footer {
  background: var(--darkColor);
  padding: 20px 0;
  // .footer__container
  &__container {
  }
  // .footer__copy
  &__copy {
    opacity: 0.5;
    display: flex;
    justify-content: center;
    font-size: 18px;
  }
}
.main-block {
  padding: 60px 0;
  @media (max-width: $mobile) {
    padding: 20px 0;
  }
  // .main-block__container
  &__container {
  }
  // .main-block__nav
  &__nav {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 20px;
    a {
      position: relative;
      display: inline-block;
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      &:hover {
        color: var(--greenColor);
      }
      &::after {
        content: '';
        height: 2px;
        transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
        bottom: 0;
        left: 0;
        width: 0;
        position: absolute;
        background: var(--greenColor);
      }
      &.router-link-exact-active {
        color: var(--greenColor);
        &::after {
          width: 100%;
        }
      }
    }
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
}
</style>
