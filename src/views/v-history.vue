<template>
  <div class="v-history">
    <div>
      <div class="page-title">
        <h3>{{ 'RecordHistory' | localize }}</h3>
      </div>

      <div class="history-chart">
        <canvas ref="canvas"></canvas>
      </div>

      <Loader v-if="loading" />

      <p class="center" v-else-if="!records.length">
        {{ 'RecordsNotFound' | localize }}
        <router-link to="/record">
          <p class="center" style="margin-top:0;">{{ 'Create' | localize }}</p>
        </router-link>
      </p>

      <section v-else>

        <HistoryTable :records="items" />

        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="localize('Back')"
          :next-text="localize('Forward')"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          :first-last-button="true"
          first-button-text='<i class="material-icons">chevron_left</i>'
          last-button-text='<i class="material-icons">chevron_right</i>'
        />

      </section>
    </div>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import paginationMixin from '@/mixins/pagination.mixin'
import { mapActions, mapGetters } from 'vuex'
import HistoryTable from '@/components/v-history_table'
import {Pie} from 'vue-chartjs'

export default {
  name: 'v-history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  data() {
    return {
      loading: true,
      records: [],
    };
  },
  computed: {
    ...mapGetters([
      'INFO'
    ]),
  },
  methods: {
    ...mapActions([
      'FETCH_RECORDS',
      'FETCH_CATEGORIES'
    ]),
    localize(key) {
      return localizeFilter(key)
    },
    setup(categories) {
      this.setupPagination(this.records.map(rec => {
        return {
          ...rec,
          categoryName: categories.find(cat => cat.id === rec.categoryId).title,
          typeClass: rec.type === 'income' ? 'green' : 'red',
          typeText: rec.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
        }
      }))

      const data = {
        labels: categories.map(c => c.title),
        datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      }

      this.renderChart(data)
    }
  },
  async mounted() {
    this.records = await this.FETCH_RECORDS()
    const categories = await this.FETCH_CATEGORIES()

    this.setup(categories)

    this.loading = false
  },
};
</script>

<style lang="scss">
</style>
