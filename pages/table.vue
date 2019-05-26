<template>
  <div>
    <h1>table page</h1>
    <button @click="fetch">fetch</button>
    {{ length }}件 fetch しました
    <table border="1">
      <tr>
        <th>年齢</th>
        <th>推定ユーザー数</th>
      </tr>
      <tr v-for="item in items" :key="item.age">
        <td>{{ item.age }}</td>
        <td>{{ item.users | format }}</td>
      </tr>
    </table>
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
    items: []
  }),

  computed: {
    length() {
      return this.items.length
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    async fetch() {
      this.items = await getJson()
    }
  }
}
</script>
