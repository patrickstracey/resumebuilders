<template>
  <header>
    <div class="holder flex-row">
      <router-link to="/"><h1>resume(dot)builders</h1></router-link>
      <router-link to="/newjob" class="link" id="post-link"
        >Post a Job</router-link
      >
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
  margin: unset;
}

.holder {
  width: 90%;
  height: 100%;
  align-items: center;
  margin: auto;
}

#post-link {
  margin-top: auto;
  margin-bottom: auto;
  font-weight: 300;
}
</style>
