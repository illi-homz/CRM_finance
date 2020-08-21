<template>
  <div class="v-home_bill">
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">{{ 'Home_CurrencyAccount' | localize }}</span>

          <p
            v-for="cur in currencies"
            :key="cur"
            class="currency-line"
          >
            <span>
              {{getCurrency(cur) | currency(cur)}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-home_bill',
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR']
    };
  },
  props: {
    rates: Object
  },
  computed: {
    base() {
      return this.$store.getters.INFO.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  },
};
</script>

<style lang="scss">
</style>
