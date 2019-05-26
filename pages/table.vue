<template>
  <div>
    <h1>table page</h1>
    <button @click="fetch">fetch</button>
    <div v-if="loading">Loading...</div>
    <template v-else>
      {{ length }}件 fetch しました
      <table border="1">
        <tr>
          <th>年齢</th>
          <th>推定ユーザー数</th>
        </tr>
        <tr v-for="item in items" :key="item.age">
          <td>{{ item.age }}</td>
          <td :style="backgroundColor(item.users)">
            {{ item.users | format }}
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
/**
 * 年齢別の推定ユーザー数を json で返す。件数はランダム
 */
function getJson() {
  return new Promise(resolve => {
    setTimeout(() => {
      const ages = Array.from(
        new Set(
          new Array(parseInt(Math.random() * 100))
            .fill(null)
            .map(() => parseInt(Math.random() * 100))
        )
      )
      resolve(
        ages.map(age => ({
          age,
          users: Math.random() * 10000
        }))
      )
    }, 1000) // 1秒後にに結果を返す
  })
}

export default {
  filters: {
    format(n) {
      return Math.round(n).toLocaleString()
    }
  },

  data: () => ({
    items: [],
    loading: false
  }),

  computed: {
    length() {
      return this.items.length
    },

    max() {
      return Math.max(...this.items.map(x => x.users))
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    async fetch() {
      this.loading = true
      this.items = await getJson()
      this.loading = false
    },

    backgroundColor(n) {
      const ratio = n / this.max
      const backgroundColor = `rgba(0, 153, 181, ${ratio})`
      return { backgroundColor }
    }
  }
}
</script>
