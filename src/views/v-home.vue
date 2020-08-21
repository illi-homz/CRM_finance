<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button
          class="btn waves-effect waves-light btn-small"
          @click="refresh"
        >
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Loader v-if="loading" />

      <div v-else class="row">
        <homeBill
          :rates="currency.rates"
        />

        <homeCurrency
          :rates="currency.rates"
          :date="currency.date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import homeBill from '@/components/v-home_bill'
import homeCurrency from '@/components/v-home_currency'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  components: {
    homeBill,
    homeCurrency
  },
  async mounted() {
    this.currency = await this.$store.dispatch('FETCH_CURRENCY')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('FETCH_CURRENCY')
      this.loading = false
    }
  },
}
</script>
