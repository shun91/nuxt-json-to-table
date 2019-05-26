<template>
  <table border="1">
    <tr>
      <th>年齢</th>
      <th>{{ valueName }}</th>
    </tr>
    <tr v-for="item in items" :key="item.age">
      <td>{{ item.age }}</td>
      <td :style="backgroundColor(item[valueName])">
        {{ item[valueName] | format }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    valueName: { type: String, required: true },
    items: { type: Array, required: true }
  },

  computed: {
    max() {
      return Math.max(...this.items.map(x => x[this.valueName]))
    }
  },

  methods: {
    backgroundColor(n) {
      const ratio = n / this.max
      const backgroundColor = `rgba(0, 153, 181, ${ratio})`
      return { backgroundColor }
    }
  }
}
</script>
