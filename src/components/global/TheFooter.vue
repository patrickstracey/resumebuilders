<template>
  <footer>
    <div class="holder flex-row">👷 &#169; resume.builders {{ year }} 👷‍♀️</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 2rem;
  position: relative;
  bottom: 0;
  left: 0;
  margin-top: 1rem;
  padding-top: 2rem;
}

.holder {
  width: 90%;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin: auto;
  color: var(--rb-main);
  font-size: 12px;
}
</style>
