<template>
  <div class="v-main_layout">
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>

      <NavBar @burger-click="isOpen = !isOpen" />

      <SideBar :isOpen="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">

          <router-view />

        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue pulse"
          to="/record"
          data-position="left"
          v-tooltip="localize('CreateNewRecord')"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/app/v-navbar'
import SideBar from '@/components/app/v-sidebar'
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'v-main_layout',
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      isOpen: true,
      loading: true
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.INFO).length) {
      await this.$store.dispatch('FETCH_INFO')
    }
    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.GET_ERROR
    },
    locale() {
      return this.$store.getters.INFO.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  methods: {
    localize(key) {
      return localizeFilter(key)
    }
  },
};
</script>

<style lang="scss">
</style>
