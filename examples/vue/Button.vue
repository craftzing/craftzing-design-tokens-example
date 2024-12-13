<script setup>
const handleClick = () => {
  console.log("Button clicked");
};
</script>

<template>
  <button @click="handleClick" class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  background-color: var(--components-button-background);
  color: var(--components-button-foreground);
  font: var(--components-button-typography);
  padding: 8px 16px;
}
</style>
