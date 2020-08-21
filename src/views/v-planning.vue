<template>
  <div class="v-planning">
    <div>
      <div class="page-title">
        <h3>{{ 'Planing' | localize }}</h3>
        <h4>{{INFO.bill | currency('RUB')}}</h4>
      </div>

      <Loader v-if="loading" />

      <p class="center" v-else-if="!categories.length"> Категорий пока нет. <router-link to="categories">Добавить категорию</router-link></p>

      <section v-else>
        <div v-for="cat in categories" :key="cat.id">
          <p>
            <strong>{{cat.title}}:</strong>
            {{cat.spend | currency('RUB')}} из {{cat.limit | currency('RUB')}}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
              class="determinate"
              :style="`width:${cat.progressPercent}%`"
              :class="cat.progressColor"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import { mapActions, mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'v-planning',
  metaInfo() {
    return {
      title: this.$title('Menu_Planing')
    }
  },
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  methods: {
    ...mapActions([
      'FETCH_CATEGORIES',
      'FETCH_RECORDS'
    ]),
  },
  computed: {
    ...mapGetters([
      'INFO'
    ]),
  },
  async mounted() {
    const records = await this.FETCH_RECORDS()
    const categories = await this.FETCH_CATEGORIES()

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const persent = 100 * spend / cat.limit

      const progressPercent = persent > 100 ? 100 : persent
      const progressColor = persent < 60
        ? 'green'
        : persent < 90
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('ExcessBy') : localizeFilter('Left')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  },
};
</script>

<style lang="scss">
</style>
