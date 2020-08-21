<template>
  <div class="v-home_currency">
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{ 'Home_ExchangeRates' | localize }}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>{{ 'Home_Currency' | localize }}</th>
                <th>{{ 'Home_Course' | localize }}</th>
                <th>{{ 'Date' | localize }}</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="cur in rubCurrencies" :key="cur">
                <td>{{ cur }}</td>
                <td>{{ (rates["RUB"] / rates[cur]).toFixed(3) }}</td>
                <td>{{ date | date("date") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-home_currency",
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"],
      rubCurrencies: ["USD", "EUR"]
    };
  },
  props: {
    rates: Object,
    date: String
  }
};
</script>

<style lang="scss"></style>
