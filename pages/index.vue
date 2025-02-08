<template>
  <div>
    <section
      data-aos="flip-up"
      class="intro relative flex flex-col lg:flex-row justify-center overflow-hidden lg:justify-between items-center md:items-start bg-gray-300 p-10 pb-0 rounded-3xl"
    >
      <img
        src="~/assets/lines.png"
        alt=""
        class="absolute top-0 h-full w-full opacity-20 z-1"
      />
      <div
        class="flex flex-col gap-5 mb-10 xl:mt-7 lg:ml-10 text-center items-center md:text-left md:items-start z-10"
      >
        <div class="flex items-center gap-5">
          <div
            :class="{ 'blob green': status, 'blob blob-red': !status }"
          ></div>
          <p
            :class="{
              'text green text-green-500': status,
              'text text-red text-red-500': !status,
            }"
          >
            GRAJ razem z {{ players }} osobami
          </p>
        </div>
        <h1 class="metropolis text-6xl text-gray-800" data-aos="fade-up">
          Dołącz na nowy <br />
          tryb boxpvp!
        </h1>
        <p>INNOWACYJNY SERWER MINECRAFT</p>
        <div
          class="flex flex-col md:flex-row items-center md:items-start gap-5"
        >
          <button
            class="nav-btn p-4 px-10 rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
            @click="copy()"
          >
            SKOPIUJ IP SERWERA
          </button>
          <a
            :href="discordLink"
            class="nav-btn p-4 px-10 rounded-xl border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black"
            >DOŁACZ NA DISCORDA</a
          >
        </div>
      </div>
      <div class="z-10 hidden xl:flex">
        <img src="~assets/render.png" alt="render" width="400" />
      </div>
    </section>
    <section class="flex flex-col gap-10">
      <div class="text-center w-full my-20" data-aos="fade-up">
        <p>Wybierz najlepszy dla Ciebie</p>
        <h2 class="metropolis text-5xl text-gray-800">Zobacz nasze tryby</h2>
      </div>
      <div
        data-aos="flip-up"
        class="flex items-center columns-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full"
        style="height: 400px"
      >
        <div
          class="p-10 gap-10 flex relative justify-between h-full border-2 rounded-3xl border-neutral-500 flex-col justify-between"
          v-for="server in $store.state.servers"
          :key="server.id"
        >
          <img
            :src="server.image"
            alt="Zdjęcie serwera"
            class="absolute -top-12 left-10 nav-btn cursor-pointer"
            width="100"
          />
          <div class="mt-5">
            <p class="text-yellow-300">Tryb</p>
            <h2 class="metropolis text-3xl text-gray-800">{{ server.name }}</h2>
          </div>
          <div class="flex flex-col gap-5">
            <p>Najczęściej wybierany tryb na serwerze</p>
            <nuxt-link
              :to="'server/' + server.id"
              class="transition text-center !w-full p-4 px-10 rounded-xl border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black"
              >Przejdź do sklepu</nuxt-link
            >
          </div>
        </div>

        <div
          class="p-10 gap-10 relative flex justify-between h-full border-2 rounded-3xl border-neutral-500 flex-col justify-between"
        >
          <img
            src="https://sklep.clearmc.pl/assets/img/soon.png"
            alt="Zdjęcie serwera"
            class="absolute -top-12 left-10 nav-btn cursor-pointer"
            width="100"
          />
          <div class="mt-5">
            <p class="text-gray-500">Tryb</p>
            <h2 class="metropolis text-3xl text-gray-300">WKRÓTCE</h2>
          </div>
          <div class="flex flex-col gap-5 text-gray-300">
            <p>
              Wchodź na nasz serwer i sprawdzaj czy nie ma już nowego trybu.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="flex flex-col relative overflow-hidden">
      <div class="text-center w-full my-20" data-aos="fade-up">
        <h2 class="metropolis text-5xl text-gray-800">Ostatnie zakupy</h2>
      </div>
      <div class="flex gap-5 ml-auto mr-auto w-max" data-aos="flip-up">
        <div
          v-for="player in $store.state.latestPayments"
          :key="player.player"
          class="bg-neutral-500 relative h-24 w-24 items-center justify-center rounded-2xl flex last-purchase-head flex-wrap"
        >
          <img
            :src="`https://mc-heads.net/head/` + player.player"
            :alt="player.player"
            class="h-12"
          />
          <div
            class="flex gap-5 items-center absolute -top-20 last-purchase-head last-purchase-text w-max py-2 px-5 rounded-xl left-0"
          >
            <span class="text-xl text-gray-800">{{ player.player }}</span>
            <span class="text-xl text-gray-800">-</span>
            <span class="text-gray-500">{{ player.product_name }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="flex flex-col">
      <div class="text-center w-full my-20" data-aos="fade-up">
        <h2 class="metropolis text-5xl text-gray-800">
          TOP 3 Najbogatszych graczy
        </h2>
      </div>
      <div
        data-aos="flip-up"
        class="flex gap-20 sm:gap-10 grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 items-start"
      >
        <div
          v-for="(player, index) in richestPlayer"
          :key="player.player"
          class="p-10 gap-5 flex flex-col relative items-center justify-center richest-player h-full border-2 rounded-3xl border-neutral-500"
        >
          <img
            :src="`https://mc-heads.net/head/` + player.player"
            :alt="player.player"
            width="80"
            class="flex self-center absolute -top-10"
          />
          <div class="flex flex-col gap-2 text-center mt-5">
            <b class="richest-player-top">TOP {{ index + 1 }}</b>
            <span class="metropolis text-3xl">{{ player.player }}</span>
          </div>
          <span class="text-center"
            >{{ Math.ceil(player.spend) }} ZŁ wydanych przez tego gracza</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Divider from "~/components/Divider.vue";

export default {
  name: "index",
  components: { Divider },
  data: function () {
    return {
      players: "?",
      richestPlayer: [],
      status: true,
    };
  },
  async created() {
    await this.loadStatus();
    if (this.$store.state.shop.richest_player) {
      await this.loadRichestPlayer();
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$config.address);
      this.$toast.success("Skopiowano adres serwera");
    },
    async loadStatus(context) {
      return await fetch(`https://api.mcsrvstat.us/2/${this.$config.address}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.online) {
            this.players = 0;
            this.status = false;
            return;
          }
          this.players = data.players.online;
        })
        .catch((err) => console.log(err));
    },
    async loadRichestPlayer(context) {
      await fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/richest_player/?amount=3`
      )
        .then((response) => response.json())
        .then((data) => {
          this.richestPlayer = data;
        })
        .catch((err) => console.error(err));
    },
  },
  computed: {
    discordLink() {
      return (
        this.$config.socialMedia.find((social) => social.name === "Discord")
          ?.link || "#"
      );
    },
  },
};
</script>

<style>
.last-purchase-head {
  background-color: #e5e5e5 !important;
  cursor: pointer !important;
}
.last-purchase-text {
  transition: all 0.3s;
  opacity: 0;
  top: -44px;
  pointer-events: none;
}

.last-purchase-head:hover .last-purchase-text {
  top: -54px;
  opacity: 1;
}

.richest-player:nth-child(2) .richest-player-top {
  color: #d4d4d4 !important;
}
.richest-player:nth-child(1) {
  border-color: #fcd34d !important;
}
.richest-player:nth-child(1) .richest-player-top {
  color: #fcd34d !important;
}
.richest-player:nth-child(3) {
  border-color: #a16207 !important;
}
.richest-player:nth-child(3) .richest-player-top {
  color: #a16207 !important;
}
</style>
