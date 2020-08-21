<template>
  <div class="v-navbar">
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('burger-click')">
            <i class="material-icons black-text">menu</i>
          </a>
          <span class="black-text">{{date | date('datetime')}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="navbarDropdown"
            >
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'v-navbar',
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  methods: {
    async logout() {
      this.$store.dispatch('LOGOUT')
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    name() {
      return this.$store.getters.INFO.name
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.navbarDropdown, {
      constrainWidth: false
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    };
  },
};
</script>

<style lang="scss">
</style>
