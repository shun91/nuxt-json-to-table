import Vue from 'vue'

function format(n) {
  return Math.round(n).toLocaleString()
}

Vue.filter('format', format) // test
