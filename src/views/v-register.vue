<template>
  <div class="v-register">
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
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="name">Имя</label>
          <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >
            Введите имя
          </small>
        </div>
        <p>
          <label>
            <input
              type="checkbox"
              v-model="agree"
              :class="{invalid: $v.agree.$dirty && !$v.agree.checked}"
            >
            <span>С правилами согласен</span>
          </label>
        </p>
        <small
        v-if="$v.agree.$dirty && !$v.agree.checked"
        class="helper-text invalid"
        >
          Необходимо согласиться с правилами
        </small>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'v-register',
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    };
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('REGISTER', formData)
        this.$router.push('/');
      } catch (e) {}
    }
  },
};
</script>

<style lang="scss">
</style>
