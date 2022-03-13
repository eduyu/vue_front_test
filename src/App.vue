<template>
  <div id="app">
    <nav-bar></nav-bar>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { NavBar },
  methods: {
    ...mapActions(['getCurrentUser'])
  },
  created() {
    this.getCurrentUser()
  }
}
</script>


<style>

</style>
