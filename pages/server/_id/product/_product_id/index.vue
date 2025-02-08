<template>
  <div>
    <div class="text-center w-full mb-20 mt-10" data-aos="fade-up">
      <h2 class="metropolis text-5xl text-gray-800">
        {{ product.name }}
      </h2>
    </div>
    <div>
      <div class="flex flex-row gap-5">
        <div class="flex flex-col gap-5 flex-1" data-aos="fade-right">
          <div
            class="bg-gray-200 flex justify-center items-center rounded-3xl p-10"
          >
            <img
              v-if="product.image"
              :src="product.image"
              alt="Zdjęcie produktu"
              width="200"
              height="200"
            />
          </div>
          <div class="flex flex-col w-full bg-gray-200 p-10 rounded-2xl">
            <p v-html="product.description" class="product-description"></p>
          </div>
          <label for="">Kod Promocyjny</label>
          <div class="flex gap-5">
            <input
              type="text"
              class="p-5 text-center rounded-xl border-2 border-gray-300 w-full flex-1"
              name="nick"
              id="nick"
              placeholder="np. FERIE"
              v-model="promoCode.code"
              :disabled="Boolean(product.promo)"
            />
            <button
              class="transition text-center !w-full p-4 px-10 rounded-xl border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black flex-1"
              @click="usePromoCode()"
            >
              Zastosuj
            </button>
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-5" data-aos="fade-left">
          <div class="flex flex-col gap-5">
            <label for="">Nick z gry</label>
            <input
              type="text"
              class="p-5 rounded-xl border-2 border-gray-300 w-full flex-1"
              name="nick"
              id="nick"
              placeholder="np. fendziorr"
              v-model="playerName"
            />
          </div>
          <label for="">Wybierz metodę płatności</label>
          <div class="flex gap-5 my-5 w-full h-max">
            <div v-for="provider in filterProviders()" :key="provider.id">
              <input
                @click="paymentMethod = provider.provider"
                type="radio"
                class="btn-check hidden peer"
                name="btnradio"
                :id="provider.id"
                :disabled="!$store.state.shop.online"
              />
              <label
                class="transition text-center p-4 px-10 rounded-xl border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black"
                :for="provider.id"
                v-if="!provider.is_sms"
                >{{ provider.name }}
                <span
                  >{{
                    $price.calcPrice(
                      product.prices[provider.provider],
                      product.promo,
                      quantity
                    )
                  }}
                  ZŁ</span
                ></label
              >
            </div>
          </div>

          <div class="flex gap-5 flex-col">
            <input
              type="text"
              class="input-txt mt-2"
              name="kod SMS"
              id="smsCode"
              placeholder="Kod SMS"
              v-model="smsCode"
              v-if="isSms(paymentMethod)"
            />

            <label v-if="product.slider" for="quantity mb-10"
              >{{ product.slider_name }} - {{ quantity }}</label
            >

            <div v-if="product.slider" class="bg-gray-200 p-5 rounded-2xl">
              <input
                type="range"
                class="range"
                id="quantity"
                v-model="quantity"
                :min="product.slider_min"
                :max="product.slider_max"
              />
            </div>

            <div class="flex flex-row gap-5" v-if="$store.state.shop.rules">
              <input
                class="checkbox rounded-full"
                type="checkbox"
                v-model="acceptedRules"
                id="acceptRulesCheckbox"
              />
              <label for="acceptRulesCheckbox"
                >Akceptuję
                <a :href="$store.state.shop.rules" target="_blank"
                  >regulamin</a
                ></label
              >
            </div>

            <button
              class="transition text-center !w-full p-4 px-10 rounded-xl border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black"
              @click="buyProduct()"
              :disabled="!$store.state.shop.online"
            >
              Zakup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      product: {},
      promoCode: {},
      providers: [],
      acceptedRules: true,
      quantity: 1,
      paymentMethod: "",
      playerName: "",
      smsCode: "",
    };
  },
  async mounted() {
    await this.loadProduct();
    await this.getProviders();
    if (this.$store.state.shop.rules) {
      this.acceptedRules = false;
    }
  },
  methods: {
    async getProviders() {
      return await fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/payments/`
      )
        .then((response) => response.json())
        .then((data) => {
          this.providers = data;
          if (this.providers.length == 1) {
            this.paymentMethod = this.providers[0].provider;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async loadProduct(context) {
      return await fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/${this.$route.params.product_id}/`
      )
        .then((response) => {
          if (!response.ok) {
            $nuxt.context.error({
              status: 404,
              message: "Produkt nie został znaleziony",
            });
          }
          return response.json();
        })
        .then((data) => {
          this.product = data;
          if (this.product.slider) {
            this.quantity = this.product.slider_min;
          }
        })
        .catch((err) => console.log(err));
    },

    usePromoCode() {
      let params = {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          code: this.promoCode.code,
          product: this.product.id,
        }),
        method: "POST",
      };

      return fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/codes/use/`,
        params
      )
        .then((response) => {
          if (!response.ok) {
            console.log(response.json());
            this.$toast.error("Niepoprawny kod rabatowy");
            throw Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          this.promoCode = data;
          this.product.promo = this.promoCode.discount;
          this.$toast.success(
            `Zastosowano kod rabatowy ${this.product.promo}%`
          );
        })
        .catch((err) => console.log(err));
    },

    async buyProduct() {
      if (!this.playerName) {
        this.$toast.error("Uzupełnij nick gracza");
        return;
      } else if (!this.paymentMethod) {
        this.$toast.error("Wybierz metodę płatności");
        return;
      } else if (!this.acceptedRules) {
        this.$toast.error("Musisz zaakceptować regulamin");
        return;
      }

      let data = {
        player: this.playerName,
        sms_code: this.smsCode,
        provider: this.paymentMethod,
        quantity: parseInt(this.quantity),
        shop: this.$route.params.shopId,
        success_page: window.location.origin + "/payment/{PAYMENT_ID}",
      };
      if (this.promoCode.id) {
        data.promo_code = this.promoCode.code;
      }

      const params = {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
        method: "POST",
      };

      return await fetch(
        `https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/${this.$route.params.product_id}/payments/`,
        params
      )
        .then((r) => r.json().then((data) => ({ status: r.ok, body: data })))
        .then((data) => {
          if (!data.status) {
            const err = data.body[Object.keys(data.body)[0]];
            if (typeof err === "object") {
              this.$toast.error(err[0]);
            } else {
              this.$toast.error(err);
            }
            console.log(data.body);
            return;
          }

          if (!this.isSms(this.paymentMethod)) {
            if (!data.body.payment_url) {
              console.log(data.body);
              this.$toast.error("Nie udało się wygenerować transakcji");
              return;
            }
            window.location = data.body.payment_url;
          } else {
            window.location =
              window.location.origin + "/payment/" + data.body.id;
          }
        })
        .catch((err) => {
          this.$toast.error(err[0]);
          console.log(err);
        });
    },

    filterProviders() {
      let goodProviders = [];
      for (
        let index = 0;
        this.providers && index < this.providers.length;
        ++index
      ) {
        const provider = this.providers[index];
        if (this.product.prices[provider.provider] != null) {
          goodProviders.push(provider);
        }
      }
      return goodProviders;
    },

    getSmsPrice(provider, smsId) {
      for (
        let index = 0;
        provider.sms_numbers && index < provider.sms_numbers.length;
        ++index
      ) {
        const smsNumber = provider.sms_numbers[index];
        if (smsNumber.id === smsId) {
          return smsNumber;
        }
      }
      return { price: -1, number: -1, sms_content: "error" };
    },

    getProvider(providerType) {
      for (
        let index = 0;
        this.providers && index < this.providers.length;
        ++index
      ) {
        const provider = this.providers[index];
        if (provider.provider === providerType) {
          return provider;
        }
      }
    },

    isSms(provider) {
      return provider.split("_").pop() === "sms";
    },
  },
};
</script>

<style scoped>
.product-section-overlay {
  border-radius: 10px;
  background: url("~assets/bg.png"),
    linear-gradient(90deg, #83653f 0%, #796040 50%, #83653f 100%) no-repeat;
}
.input-txt {
  padding: 10px;
  background: #222;
  color: #ececec;
  outline: none;
  border-radius: 10px;
}
.check-btn {
  padding: 8px;
  background: #a47940;
  border-radius: 10px;
  text-align: center;
  transition: 0.2s;
  width: 100%;
}
.gradient-button {
  padding: 10px;
  background: var(--primary-color);
  border-radius: 10px;
  text-align: center;
  transition: 0.2s;
  width: 100%;
}
input:disabled,
button:disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  border-radius: 50px;
  background: #ffd54f;
}
.range {
  -webkit-appearance: none;
  width: 200px;
  height: 15px;
  background: #eeeeee;
  border-radius: 5px;
  background-repeat: no-repeat;
}
.check-btn:hover {
  cursor: pointer;
  background: #a98455;
}
label {
  cursor: pointer;
}
input[type="radio"]:checked ~ label {
  background: #ffd54f;
  color: black;
}
input[type="checkbox"] {
  appearance: none;
  background: #eeeeee;
  outline: none;
  width: 25px;
  height: 25px;
  border: none;
  display: grid;
  place-content: center;
}
input[type="checkbox"]:hover {
  cursor: pointer;
}
input[type="checkbox"]::before {
  content: "";
  width: 25px;
  height: 25px;
  transform: scale(0);
  background: #ffd54f;
  border-radius: 50%;
  transition: 0.3s transform ease-in-out;
}
input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
