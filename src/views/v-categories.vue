<template>
  <div class="v-categories">
    <div>
      <div class="page-title">
        <h3>{{ 'Menu_Categories' | localize }}</h3>
      </div>
      <section>
        <Loader v-if="loading" />
        <div v-else class="row">

        <CategoriesCreate
          @created="addNewCategory"
        />

        <CategoriesEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />

        <p v-else class="center">{{ 'CategoriesNotFound' | localize }}</p>

        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/v-categories_create'
import CategoriesEdit from '@/components/v-categories_edit'

export default {
  name: 'v-categories',
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  components: {
    CategoriesCreate,
    CategoriesEdit
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(categoryData) {
      const inx = this.categories.findIndex(val => val.id = categoryData.id)
      this.categories[inx].title = categoryData.title
      this.categories[inx].limit = categoryData.limit
      this.updateCount++
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
    this.loading = false
  },
};
</script>

<style lang="scss">
</style>
