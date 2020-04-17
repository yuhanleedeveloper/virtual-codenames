<template>
  <div>
    <div class="container">
      <div class="nav">
        <router-link class="link" to="/codenames">Codenames</router-link>
      </div>
      <div class="nav">
        <router-link class="link" to="/kings">Kings</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.nav {
  margin: 0 20px;
  background-color: rgb(43, 236, 124);
  width: 200px;
  border-radius: 10px;
  padding: 10px 0;
  transform: translateY(-40px);
}
.link {
  color: black;
  text-decoration: none;
  font-weight: 600;
  font-size: 24px;
}

.nav:hover {
  background-color: rgb(38, 194, 103);
}
</style>
