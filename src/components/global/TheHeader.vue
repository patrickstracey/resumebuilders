<template>
  <header>
    <div class="holder flex-row">
      <router-link to="/" id="home-link"><h1>resume🔨builders</h1></router-link>
      <router-link to="/newjob" class="link" id="post-link"
        >📢 Post a Job <small>(it's free!)</small></router-link
      >
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: unset;
  position: absolute;
  top: 0;
  left: 0;
}

h1 {
  color: green;
  margin: unset;
  text-decoration: none;
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
  font-size: 21px;
  padding: 8px 16px 8px 16px;
  margin-top: 24px;
  cursor: pointer;
  align-self: center;
  font-weight: 300;
}

#home-link {
  text-decoration: none;
}
</style>
