<template>
  <div class="v-categories_update">
    <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>{{ 'Edit' | localize }}</h4>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="input-field">
            <select ref="select" v-model="current">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{category.title}}
              </option>
            </select>
            <label>{{ 'SelectCategory' | localize }}</label>
          </div>

          <div class="input-field">
            <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
            >
            <label for="name">{{ 'Title' | localize }}</label>
            <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
            >
              {{ 'EnterCategoryTitle' | localize }}
            </span>
          </div>

          <div class="input-field">
            <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            >
            <label for="limit">{{ 'Limit' | localize }}</label>
            <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
            >
              {{ 'MinimalValue' | localize }} {{$v.limit.$params.minValue.min}}
            </span>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            {{ 'Update' | localize }}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  name: 'v-categories_update',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  // props: ['categories'],
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null
    };
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('ACTION_UPDATE_CATEGORY', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}


    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  watch: {
    current(catID) {
      const {title, limit} = this.categories.find(c => c.id === catID)
      this.title = title
      this.limit = limit
    }
  },
};
</script>

<style lang="scss">
</style>
