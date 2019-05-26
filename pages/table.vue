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
      <data-table :value-name="valueName" :items="items" />
    </template>
  </div>
</template>

<script>
import LinkButton from '~/components/LinkButton'
import DataTable from '~/components/DataTable'

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
  components: { LinkButton, DataTable },

  data: () => ({
    items: [],
    loading: false,
    valueName: ''
  }),

  computed: {
    length() {
      return this.items.length
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
    }
  },

  watchQuery: ['valueName']
}
</script>
