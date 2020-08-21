<template>
  <div class="v-detail_record">
    <div>
      <Loader v-if="loading" />

      <div v-else-if="record">
        <div class="breadcrumb-wrap">
          <router-link to="/history" class="breadcrumb">
            {{ 'Menu_History' | localize }}
          </router-link>
          <a @click.prevent class="breadcrumb">
            {{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}
          </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div
              class="card"
              :class="{
                'green': record.type === 'income',
                'red': record.type === 'outcome',
              }"
            >
              <div class="card-content white-text">
                <p>{{ 'Description' | localize }}: {{ record.description }}</p>
                <p>{{ 'Summ' | localize }}: {{ record.amount | currency }}</p>
                <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>

                <small>{{ record.date | date('datetime') }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="center" v-else>Запись с id: {{ $route.params.id }} не найдена</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'v-detail_record',
  metaInfo() {
    return {
      title: this.$title('DetailsTitle')
    }
  },
  data() {
    return {
      loading: true,
      record: null
    };
  },
  methods: {
    ...mapActions([
      'FETCH_RECORD_BY_ID',
      'FETCH_CATEGORY_BY_ID'
    ]),
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.FETCH_RECORD_BY_ID(id)
    const category = await this.FETCH_CATEGORY_BY_ID(record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,
    }

    this.loading = false
  },
};
</script>

<style lang="scss">
</style>
