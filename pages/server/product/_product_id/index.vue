<template>
  <div class="container mx-auto sm:px-4 flex flex-col mt-4">
    <div class="flex items-center ml-6">
      <h1 class="text-4xl">{{ product.name }}</h1>
      <span
        class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded ms-2 mb-2 fs-6"
        style="background-color: var(--primary-color)"
        v-if="product.promo"
        >-{{ product.promo }}%</span
      >
    </div>
    <div class="bg-second xl:p-6 p-0 xl:m-6 product-section-overlay">
      <div class="xl:m-4 m-0 flex flex-wrap justify-center">
        <div class="flex xl:w-3/4 pr-4 pl-4 w-full flex flex-wrap">
          <div class="flex flex-col w-full xl:w-1/4 pr-4 pl-4 items-center">
            <img
              v-if="product.image"
              :src="product.image"
              alt="Zdjęcie produktu"
              width="200"
              height="200"
            />
            <input
              type="text"
              class="input-txt mt-4 mb-2"
              name="nick"
              id="nick"
              placeholder="Kod rabatowy"
              v-model="promoCode.code"
              :disabled="Boolean(product.promo)"
            />
            <button
              class="gradient-button w-full"
              v-if="promoCode.code && !promoCode.discount"
              @click="usePromoCode()"
            >
              Zastosuj
            </button>
          </div>
          <div class="flex flex-col w-full xl:w-3/4 pr-4 pl-4">
            <p v-html="product.description" class="product-description"></p>
          </div>
        </div>

        <div class="flex flex-col xl:w-1/4 pr-4 pl-4 w-full">
          <div
            class="relative inline-flex align-middle flex flex-wrap"
            role="group"
          >
            <span class="mb-5" v-if="providers.length > 1"
              >Wybierz metodę płatności</span
            >
            <div
              v-for="provider in filterProviders()"
              :key="provider.id"
              class="w-full mb-2"
            >
              <input
                @click="paymentMethod = provider.provider"
                type="radio"
                class="btn-check hidden peer"
                name="btnradio"
                :id="provider.id"
                :disabled="!$store.state.shop.online"
              />
              <label
                class="check-btn text-center uppercase"
                :for="provider.id"
                v-if="!provider.is_sms"
                >{{ provider.name }}
                <span class="fw-semibold"
                  >{{
                    $price.calcPrice(
                      product.prices[provider.provider],
                      product.promo,
                      quantity
                    )
                  }}
                  zł</span
                ></label
              >
              <label
                class="check-btn text-center uppercase"
                :for="provider.id"
                v-else
                >{{ provider.name }}
                <span class="fw-semibold"
                  >{{
                    getSmsPrice(provider, product.prices[provider.provider])
                      .price
                  }}
                  zł</span
                ></label
              >
            </div>
          </div>

          <div class="flex flex-col mt-3">
            <div v-if="paymentMethod === 'hotpay_sms'" class="mb-4">
              Wyślij SMS o treści
              <b>{{
                getSmsPrice(
                  getProvider(paymentMethod),
                  product.prices[paymentMethod]
                ).sms_content
              }}</b>
              na numer
              <b>{{
                getSmsPrice(
                  getProvider(paymentMethod),
                  product.prices[paymentMethod]
                ).number
              }}</b
              >. Koszt SMSa wynosi
              <b>{{
                getSmsPrice(
                  getProvider(paymentMethod),
                  product.prices[paymentMethod]
                ).price
              }}</b>
              zł brutto.
            </div>
            <div v-else-if="isSms(paymentMethod)" class="mb-4">
              Wyślij SMS o treści
              <b>{{ getProvider(paymentMethod).sms_content }}</b> na numer
              <b>{{
                getSmsPrice(
                  getProvider(paymentMethod),
                  product.prices[paymentMethod]
                ).number
              }}</b
              >. Koszt SMSa wynosi
              <b>{{
                getSmsPrice(
                  getProvider(paymentMethod),
                  product.prices[paymentMethod]
                ).price
              }}</b>
              zł brutto.
            </div>

            <input
              type="text"
              class="input-txt"
              name="nick"
              id="nick"
              placeholder="Nick gracza"
              v-model="playerName"
              min="3"
              maxlength="16"
            />
            <input
              type="text"
              class="input-txt mt-2"
              name="kod SMS"
              id="smsCode"
              placeholder="Kod SMS"
              v-model="smsCode"
              v-if="isSms(paymentMethod)"
            />

            <div v-if="product.slider" class="input-txt mt-2 flex flex-col">
              <label for="quantity" class="form-label mb-3"
                >{{ product.slider_name }} -
                <span class="fw-semibold">{{ quantity }}</span></label
              >
              <input
                type="range"
                class="range w-full mb-3"
                id="quantity"
                v-model="quantity"
                :min="product.slider_min"
                :max="product.slider_max"
              />
            </div>

            <div class="flex flex-row mt-2" v-if="$store.state.shop.rules">
              <input
                class="checkbox"
                type="checkbox"
                v-model="acceptedRules"
                id="acceptRulesCheckbox"
              />
              <label class="ms-2" for="acceptRulesCheckbox"
                >Akceptuję
                <a :href="$store.state.shop.rules" target="_blank"
                  >regulamin</a
                ></label
              >
            </div>

            <button
              class="gradient-button mt-2"
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
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: var(--primary-color);
}
.range {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 7px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background: #ffffff;
  background-repeat: no-repeat;
}
.check-btn:hover {
  cursor: pointer;
  background: #a98455;
}
input[type="radio"]:checked ~ label {
  background: var(--primary-color);
}
input[type="checkbox"] {
  appearance: none;
  background: #1e1e1e;
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
  width: 15px;
  height: 15px;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--primary-color);
}
input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
