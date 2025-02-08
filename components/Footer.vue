<template>
  <div>
    <footer class="flex justify-center flex-col gap-10 mt-20">
      <div class="flex w-full items-center gap-5">
        <nuxt-link to="/">
          <img
            :src="$store.state.shop.logo"
            alt="Logo serwera"
            width="80"
            height="80"
            class="logo"
          />
        </nuxt-link>
        <div class="w-full border-t-2 border-gray-100"></div>
      </div>
      <h2 class="metropolis text-xl text-gray-800">
        &copy; {{ new Date().getFullYear() }}
        {{ $store.state.shop.name }} WSZELKIE PRAWA ZASTRZEŻONE
      </h2>
      <div class="flex flex-col md:flex-row gap-10 justify-between">
        <p>
          PL - Serwer YOLOMC.PL nie jest w żaden sposób <br />
          powiązany z firmą Mojang lub Microsoft. <br /><br />
          EN - YOLOMC.PL server is not associated with Mojang <br />
          or Microsoft in any way.
        </p>
        <div class="flex gap-10">
          <div class="flex flex-col gap-5">
            <span class="metropolis text-xl">Przydatne Linki</span>
            <ul class="flex flex-col">
              <li v-if="$store.state.shop.home_link">
                <nuxt-link to="/" class="nav-link">Strona główna</nuxt-link>
              </li>
              <li
                v-for="navElement in $store.state.shop.navigation"
                v-bind:key="navElement.id"
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
            </ul>
          </div>
          <div class="flex flex-col gap-5">
            <span class="metropolis text-xl">Social Media</span>
            <ul class="flex flex-col">
              <li v-for="social in this.$config.socialMedia" :key="social.name">
                <a :href="social.link" class="nav-link">{{ social.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full border-t-2 border-gray-100"></div>
      <div
        class="w-full mb-10 flex sm:items-center items-start justify-between flex-col sm:flex-row"
      >
        <p>
          Strona serwera jest stworzona przez
          <a
            href="https://yolocode.pl/"
            target="_blank"
            class="transition-all duration-300 hover:text-yellow-300 hover:underline"
            >Yolo Solutions</a
          >
        </p>
        <div class="flex justify-center justify-self-center">
          <!-- usunięcie, użycie znacznika rel w linku, zmiana/zmniejszenie widoczności poniższego akapitu będzie złamaniem licencji oraz blokadą sklepu -->
          <!-- zakazana jest również edycja zawartości poniższej linijki, nie można nic dopisywać, podawać się za autora, ani zmieniać -->
          <p>
            Sklep serwera jest zasilany przez
            <a
              href="https://vishop.pl"
              target="_blank"
              class="transition-all duration-300 hover:text-yellow-300 hover:underline"
              >VIshop.pl</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
svg {
  transition: 0.3s;
  width: 40px;
  height: 40px;
  fill: currentColor;
}
.link-icon:hover > svg {
  fill: #000 !important;
}
.vertical-divider {
  background: linear-gradient(
    180deg,
    rgba(236, 236, 236, 0) 0%,
    rgba(236, 236, 236, 0.5) 49.48%,
    rgba(236, 236, 236, 0) 100%
  );
  width: 2px;
  height: 160px;
}
</style>
