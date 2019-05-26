<template>
  <div>
    <h1>table page</h1>
    <button @click="fetch">fetch</button>
    <p>{{ items }}</p>
  </div>
</template>

<script>
/**
 * 年齢別の推定ユーザー数を json で返す。件数はランダム
 */
function getJson() {
  const ages = Array.from(
    new Set(
      new Array(parseInt(Math.random() * 100))
        .fill(null)
        .map(() => parseInt(Math.random() * 100))
    )
  )
  return ages.map(age => ({
    age,
    users: Math.random() * 10000
  }))
}

export default {
  data: () => ({
    items: []
  }),

  methods: {
    fetch() {
      this.items = getJson()
    }
  }
}
</script>
