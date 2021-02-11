<template>
  <header>
    <div class="holder flex-row">
      <router-link to="/"><h1>resume(dot)builders</h1></router-link>
      <router-link to="/newjob"><h3>Post a Job</h3></router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: green;
  position: absolute;
  top: 0;
  left: 0;
}

h1 {
  color: white;
}

.holder {
  width: 90%;
  align-items: center;
  margin: auto;
}
</style>
