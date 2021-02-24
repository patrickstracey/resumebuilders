<template>
  <div class="flex-row cities">
    <span v-for="city of cities" v-bind:key="city" class="city-shield">
      {{ city }} 📍
    </span>
  </div>
</template>

<script>
export default {
  name: "ShieldCity",
  props: {
    cities: [],
  },
};
</script>

<style scoped>
.cities {
  margin-top: 8px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.city-shield {
  margin: 0px 12px 4px 0px;
  border-radius: 6px;
  padding: 4px 12px 4px 12px;
  font-size: 14px;
  background-color: #c2dcff4a;
  color: #1456ac;
  border: 1px solid #1456ac;
}
</style>
