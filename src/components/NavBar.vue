<template>
  <nav class="nav-bar">
    <router-link to="/" class="nav-link">About</router-link>
    <router-link to="/data-viz" class="nav-link">Data Viz</router-link>
    <router-link to="/code-sketches" class="nav-link"
      >Code Sketches</router-link
    >
    <router-link to="/physical-art" class="nav-link">Physical Art</router-link>
  </nav>
</template>

<script setup></script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--current-back);
  justify-content: space-evenly;
  position: fixed;
  top: 0px;
  z-index: 5;
  border-bottom: 0.4px solid black;
}
.nav-link,
.router-link-exact-active {
  text-align: center;
  font-size: 10px;
  font-style: normal;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  width: 25%;
  height: 100%;
  color: black;
  font-weight: 100;
  line-height: 200%;
  letter-spacing: 2.25px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}
.router-link-exact-active {
  font-weight: 700;
  /* font-size: 12px; */
  width: 50%;
  background-color: var(--current-back);
  background-color: black;
  color: var(--current-back);
  border-left: 0.5px solid black;
  border-right: 0.5px solid black;
}

.nav-link:hover {
  border-left: 0.5px solid black;
  border-right: 0.5px solid black;
}
</style>
