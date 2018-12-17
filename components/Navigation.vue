<template>
  <nav class="navbar is-transparent is-dark" role="navigation" aria-label="main navigation">
    <!--logo-->
    <div class="navbar-brand">
      <a class="navbar-item" href="/">OUR LIBRARY</a>
      <!--burger-->
      <div class="navbar-burger burger" v-bind:class="{ 'is-active': menuActive }" v-on:click="menuToggle" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!--menu-->
    <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'is-active': menuActive }">
      <div class="navbar-start">
        <a class="navbar-item" href="/">
          Home
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            管理メニュー
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="/register">
              本の登録
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        menuActive: false,
      }
    },
    methods: {
      menuToggle() {
        this.menuActive = !this.menuActive;
      },
    }
  }
</script>
