<template>
  <div class="v-profile">
    <div>
      <div class="page-title">
        <h3>{{ 'ProfileTitle' | localize }}</h3>
      </div>

      <form class="form" @submit.prevent="onSubmit">
        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="description">{{'Name' | localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >
            {{ 'Message_EnterName' | localize }}
          </span>
        </div>

        <div class="switch">
          <label>
            English
            <input type="checkbox" v-model="isRuLoacale">
            <span class="lever"></span>
            Русский
          </label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>

      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'v-profile',
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data() {
    return {
      name: '',
      isRuLoacale: true
    };
  },
  validations: {
    name: {required},
  },
  methods: {
    ...mapActions([
      'UPDATE_INFO'
    ]),
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.UPDATE_INFO({
          name: this.name,
          locale: this.isRuLoacale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}

    },
  },
  computed: {
    ...mapGetters([
      'INFO'
    ]),
  },
  mounted() {
    this.name = this.INFO.name
    this.isRuLoacale = this.INFO.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 1rem;
}
</style>
