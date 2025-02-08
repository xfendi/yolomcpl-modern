<template>
  <div class="flex flex-col items-center">
    <div class="text-center w-full my-20" data-aos="fade-up">
      <p>Zrealizuj swój voucher</p>
      <h2 class="metropolis text-5xl text-gray-800">Voucher</h2>
    </div>
    <div class="flex flex-col gap-5 items-center w-96" data-aos="flip-up">
      <label for="">Podaj nick gracza</label>
      <input
        type="text"
        class="p-5 text-center rounded-xl border-2 border-gray-300 w-full"
        placeholder="np. fendziorr"
        v-model="nick"
      />
      <label for="">Podaj kod voucher </label>
      <input
        type="text"
        class="p-5 text-center rounded-xl border-2 border-gray-300 w-full"
        placeholder="np. yolo123"
        v-model="code"
      />
      <button
        class="transition text-center w-full p-4 px-10 rounded-xl border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black"
        @click="useVoucher"
      >
        Zrealizuj Voucher
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      nick: "",
      code: "",
    };
  },
  methods: {
    async useVoucher(context) {
      const params = {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ player: this.nick, code: this.code }),
        method: "POST",
      };

      return await fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/vouchers/use/`,
        params
      )
        .then((response) => {
          if (!response.ok) {
            this.$toast.error("Niepoprawny voucher");
            throw Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          this.$toast.success("Voucher został zrealizowany");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
