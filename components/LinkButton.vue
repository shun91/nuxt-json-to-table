<template>
  <n-link :to="to">
    <button><slot /></button>
  </n-link>
</template>

<script>
export default {
  props: {
    to: { type: Object, required: true }
  }
}
</script>
