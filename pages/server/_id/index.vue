<template>
  <div>
    <div class="text-center w-full my-20">
      <p>Najlepsza selekcja produktów dla</p>
      <h2 class="metropolis text-5xl text-gray-800">
        {{ $store.state.server.name }}
      </h2>
    </div>
    <div
      class="grid gap-x-10 gap-y-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      <span
        v-if="$store.state.products.length === 0 && $store.state.server.name"
        >Wybrany serwer nie posiada żadnych produktów.</span
      >

      <div
        class="p-10 gap-10 flex relative justify-between h-full border-2 rounded-3xl border-neutral-500 flex-col justify-between"
        v-for="product in $store.state.products"
        v-bind:key="product.id"
      >
        <img
          v-if="product.image"
          :src="product.image"
          alt="Zdjęcie produktu"
          width="100"
          class="absolute -top-12 left-10 nav-btn cursor-pointer"
        />

        <div class="mt-5">
          <div v-if="product.main_price">
            <span
              class="text-xl text-yellow-300"
              :class="{ 'line-through': product.promo }"
              >od {{ product.main_price }} ZŁ</span
            >
            <span class="ml-2 text-primary text-xl" v-if="product.promo"
              >{{
                $price.calcPrice(product.main_price, product.promo)
              }}
              zł</span
            >
          </div>
          <h2
            class="metropolis text-3xl text-gray-800"
            v-if="$config.showProductName"
          >
            {{ product.name }}
          </h2>
        </div>

        <div class="flex flex-col gap-5">
          <p v-if="product.description" v-html="product.description"></p>
          <a
            :href="
              'https://vishop.pl/pay/' + $store.state.shop.id + '/' + product.id
            "
            class="transition text-center !w-full p-4 px-10 rounded-xl border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black"
          >
            Kliknij, aby kupić
            <div
              v-if="product.promo"
              class="absolute -top-4 -right-4 promo-indicator"
            >
              -{{ product.promo }}%
            </div>
          </a>
        </div>
      </div>
    </div>

    <div v-if="$store.state.shop.monthly_goal_public !== null">
      <div class="flex justify-between gap-10 mt-20 w-full">
        <div class="lighter-bg rounded-full" style="width: 95%;">
          <div
            class="bg-yellow-300 rounded-l-full"
            :style="`width: ` + $store.state.shop.monthly_goal_public + `%;`"
            v-bind:class="{ 'h-full': $store.state.shop.monthly_goal_public > 0 }"
          ></div>
        </div>
        <span>{{ Math.ceil($store.state.shop.monthly_goal_public) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: { Divider },
  data: function () {
    return {
      announcements: [],
    };
  },
  async created() {
    await this.$store.dispatch("loadServer", this.$route.params.id);
    await this.$store.dispatch("loadProducts", this.$route.params.id);
    await this.loadAnnouncements();
  },
  methods: {
    async loadAnnouncements(context) {
      await fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/announcements/`
      )
        .then((response) => response.json())
        .then((data) => {
          this.announcements = data;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
.product-link:hover {
  cursor: pointer;
}
.buy-btn {
  border-radius: 10px;
  background: #222;
  width: 100%;
  padding: 23px;
  margin-top: auto;
}
.promo-indicator {
  border-radius: 10px;
  background: rgba(94, 230, 72, 0.25);
  color: #5ee648;
  text-align: center;
  font-size: 20px;
  padding: 5px 24px 5px 24px;
}
</style>
