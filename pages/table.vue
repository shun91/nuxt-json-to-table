<template>
  <div>
    <h1>table page</h1>
    <input v-model="valueName" />
    <link-button :to="{ query: { valueName } }">
      fetch
    </link-button>
    <div v-if="loading">Loading...</div>
    <template v-else>
      {{ length }}件 fetch しました
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
  </div>
</template>

<script>
import LinkButton from '~/components/LinkButton'

/**
 * 年齢別の推定ユーザー数を json で返す。件数はランダム
 */
function getJson(valueName) {
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
          [valueName]: Math.random() * 10000
        }))
      )
    }, 1000) // 1秒後にに結果を返す
  })
}

export default {
  components: { LinkButton },

  filters: {
    format(n) {
      return Math.round(n).toLocaleString()
    }
  },

  data: () => ({
    items: [],
    loading: false,
    valueName: ''
  }),

  computed: {
    length() {
      return this.items.length
    },

    max() {
      return Math.max(...this.items.map(x => x[this.valueName]))
    }
  },

  created() {
    this.valueName = this.$route.query.valueName || 'users'
    this.fetch(this.valueName)
  },

  methods: {
    async fetch() {
      this.loading = true
      this.items = await getJson(this.valueName)
      this.loading = false
    },

    backgroundColor(n) {
      const ratio = n / this.max
      const backgroundColor = `rgba(0, 153, 181, ${ratio})`
      return { backgroundColor }
    }
  },

  watchQuery: ['valueName']
}
</script>
