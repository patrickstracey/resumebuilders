<template>
  <div class="loader-holder flex-column">
    <ul class="loader">
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
      <li class="brick"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LoadSpinner",
};
</script>

<style scoped>
.loader-holder {
  margin: auto;
  text-align: center;
}

.loader {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 150px;
  height: 75px;
  column-gap: 6px;
  row-gap: 6px;
  padding-left: unset;
}

.brick {
  justify-self: stretch;
  background-color: var(--rb-main);
  border-radius: 4px;
  animation: radiate 1s infinite alternate;
  display: block;
  list-style: none;
  opacity: 0;
}

.loader li:nth-child(1) {
  background-color: var(--rb-main-light-active);
}

.loader li:nth-child(2) {
  animation-delay: 1.7s;
}

.loader li:nth-child(3) {
  animation-duration: 4s;
  background-color: var(--rb-main-light-active);
}

.loader li:nth-child(4) {
  animation-delay: 1s;
}

.loader li:nth-child(5) {
  animation-duration: 1.2s;
}

.loader li:nth-child(6) {
  animation-delay: 1.5s;
  background-color: var(--rb-main-light-active);
}

.loader li:nth-child(7) {
  animation-delay: 0.5s;
  background-color: var(--rb-main-light-active);
}

.loader li:nth-child(8) {
  animation-delay: 2s;
  animation-duration: 1s;
  background-color: var(--rb-main-light-active);
}

.loader li:nth-child(9) {
  animation-delay: 3.5s;
}

@keyframes radiate {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.9;
  }
}
</style>
