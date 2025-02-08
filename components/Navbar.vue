<template>
  <nav class="navbar justify-center">
    <div
      class="flex items-center px-10 py-5 justify-between gap-10"
      v-bind:class="{ 'flex-row': !showMenu, 'flex-col': showMenu }"
    >
      <div class="flex gap-10 items-center" data-aos="fade-right">
        <div class="flex gap-10 items-center">
          <nuxt-link to="/">
            <img
              :src="$store.state.shop.logo"
              alt="Logo serwera"
              width="80"
              height="80"
              class="logo"
            />
          </nuxt-link>
        </div>

        <div
          v-bind:class="{ hidden: !showMenu, 'flex flex-col': showMenu }"
          class="w-full lg:block lg:w-auto"
          id="navbar-default"
        >
          <ul
            class="flex items-center align-center flex-col gap-5 lg:gap-10 lg:flex-row"
          >
            <li v-if="$store.state.shop.home_link">
              <nuxt-link to="/" class="nav-link">Strona główna</nuxt-link>
            </li>
            <li
              v-for="navElement in $store.state.shop.navigation"
              v-bind:key="navElement.id"
              class="flex-1"
            >
              <nuxt-link
                :to="'/subpage/' + navElement.subpage"
                v-if="navElement.subpage"
                class="nav-link"
                >{{ navElement.name }}</nuxt-link
              >
              <a :href="navElement.url" v-else class="nav-link">{{
                navElement.name
              }}</a>
            </li>
            <li class="flex-1">
              <nuxt-link to="/voucher" class="nav-link">Voucher</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div data-aos="fade-left">
        <nuxt-link
          to="/voucher"
          v-bid:class="{ hidden: !showMenu, flex: showMenu }"
          class="nav-btn mr-auto hidden lg:flex lg:mr-0 ml-auto p-4 px-10 rounded-xl !text-black border-2 border-black hover:bg-yellow-300"
          >Zrealizuj Voucher</nuxt-link
        >
      </div>
      <button
        data-aos="fade-left"
        @click="toggleNavbar"
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center w-10 h-10 justify-center text-black border-black rounded-lg lg:hidden hover:bg-yellow-300 focus:outline-none border-2 transition-all duration-300"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Otwórz menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
      console.log(this.showMenu);
    },
  },
};
</script>

<style>
.logo,
.nav-link,
.nav-btn {
  transition: all 0.3s;
}

.logo:hover,
.nav-btn:hover {
  transform: rotate(-5deg) scale(0.95);
}

.nuxt-link-exact-active,
.nav-link:hover {
  color: #fcd34d;
}
</style>
