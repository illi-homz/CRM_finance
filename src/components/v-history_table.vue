<template>
  <div class="v-history_table">
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Summ' | localize }}</th>
        <th>{{ 'Date' | localize }}</th>
        <th>{{ 'Category' | localize }}</th>
        <th>{{ 'Description' | localize }}</th>
        <th>{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>{{ record.description }}</td>
        <td>
          <span
            class="white-text badge"
            :class="record.typeClass"
          >
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <router-link :to="`/detail/${record.id}`">
            <button
              v-tooltip="localize('OpenRecord')"
              data-position="left"
              class="btn-small btn"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'v-history_table',
  data() {
    return {};
  },
  props: {
    records: {
      type: Array,
      required: true,
      default: []
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
