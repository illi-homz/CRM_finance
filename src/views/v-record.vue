<template>
  <div class="v-record">
    <div>
      <div class="page-title">
        <h3>{{ 'Menu_NewRecord' | localize }}</h3>
      </div>

      <Loader v-if="loading" />

      <p class="center" v-else-if="!categories.length"> {{ 'CategoriesNotFound'| localize }}. <router-link to="categories">{{ 'AddCategory' | localize }}</router-link></p>

      <form v-else class="form" @submit.prevent="onSubmit">
        <div class="input-field" >
          <select ref="select" v-model="category">
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

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
            />
            <span>{{ 'Income' | localize }}</span>
          </label>
        </p>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
            />
            <span>{{ 'Outcome' | localize }}</span>
          </label>
        </p>

        <div class="input-field">
          <input
              id="amount"
              type="number"
              v-model.number="amount"
              :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">{{ 'Summ' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue"
          >
            {{ 'MinimalValue' | localize }} {{$v.amount.$params.minValue.min}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
              :class="{invalid: $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">{{ 'Description' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
          >
            {{ 'EnterDescription' | localize }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Create' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  name: 'v-record',
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },
  data() {
    return {
      categories: [],
      loading: true,
      select: null,
      category: null,
      type: 'income',
      amount: 1,
      description: ''
    };
  },
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  computed: {
    ...mapGetters(['INFO']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.INFO.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('CREATE_RECORD', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income'
            ? this.INFO.bill + this.amount
            : this.INFO.bill - this.amount

          await this.$store.dispatch('UPDATE_INFO', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message(`Средств на вашем счету не достаточно (не хватает: ${this.amount - this.INFO.bill}р)`)
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
};
</script>

<style lang="scss">
</style>
