<template>
  <div class="v-login">
    <form @submit.prevent="onSubmit" class="card auth-card">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small
            v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
          >
            Поле не должно быть пустым
          </small>
          <small
            v-else-if="!$v.email.email"
            class="helper-text invalid"
          >
            Введите корректный email
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Пароль</label>
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
          >
            Введите пароль
          </small>
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
          >
            Длина пароля должна быть больше {{$v.password.$params.minLength.min}} символов. Сейчас он {{ password.length }}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'v-login',
  metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('LOGIN', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss">
</style>
