<template>
  <div class="v-empty_layout">
    <div class="grey darken-1 empty-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  name: 'v-empty_layout',
  data() {
    return {};
  },
  computed: {
    error() {
      return this.$store.getters.GET_ERROR
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
};
</script>

<style lang="scss">
</style>
