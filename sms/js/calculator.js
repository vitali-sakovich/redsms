const serviceData = [
  {
    name: 'SMS рассылка',
    radio: true,
    checkbox: true,
    lengthInput: false,
    codeLengthVisibility: false,
    nameTypeArray: [
      {
        nameType: 'Бесплатное имя',
        numberSms: [
          {
            number: 1,
            priceSms: 2.14,
          },
          {
            number: 1400,
            priceSms: 2.11,
          },
          {
            number: 3300,
            priceSms: 2.08,
          },
          {
            number: 12000,
            priceSms: 2.05,
          },
          {
            number: 24600,
            priceSms: 2.03,
          },
          {
            number: 100000,
            priceSms: 2.03,
          },
        ],
      },
      {
        nameType: 'Платное имя',
        categories: [
          {
            category: 'рекламные',
            numberSms: [
              {
                number: 10000,
                priceSms: 1.9,
              },
              {
                number: 25000,
                priceSms: 1.89,
              },
              {
                number: 50000,
                priceSms: 1.88,
              },
              {
                number: 100000,
                priceSms: 1.87,
              },
              {
                number: 500000,
                priceSms: 1.83,
              },
              {
                number: 1000000,
                priceSms: 1.82,
              },
              {
                number: 1000000,
                priceSms: 1.82,
              },
              {
                number: 3000000,
                priceSms: 1.77,
              },
              {
                number: 5000000,
                priceSms: 1.73,
              },
              {
                number: 10000000,
                priceSms: 1.71,
              },
              {
                number: 20000000,
                priceSms: 1.69,
              },
            ],
          },
          {
            category: 'сервисные',
            numberSms: [
              {
                number: 10000,
                priceSms: 1.68,
              },
              {
                number: 25000,
                priceSms: 1.66,
              },
              {
                number: 50000,
                priceSms: 1.64,
              },
              {
                number: 100000,
                priceSms: 1.62,
              },
              {
                number: 500000,
                priceSms: 1.6,
              },
              {
                number: 1000000,
                priceSms: 1.58,
              },
              {
                number: 1000000,
                priceSms: 1.53,
              },
              {
                number: 3000000,
                priceSms: 1.49,
              },
              {
                number: 5000000,
                priceSms: 1.73,
              },
              {
                number: 10000000,
                priceSms: 1.47,
              },
              {
                number: 20000000,
                priceSms: 1.45,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'VIBER-рассылка',
    radio: false,
    checkbox: true,
    lengthInput: false,
    codeLengthVisibility: false,
    categories: [
      {
        category: 'рекламные',
        numberSms: [
          {
            number: 1,
            priceSms: 1.75,
          },
          {
            number: 1000,
            priceSms: 1.7,
          },
          {
            number: 2000,
            priceSms: 1.68,
          },
          {
            number: 4500,
            priceSms: 1.65,
          },
          {
            number: 6250,
            priceSms: 1.65,
          },
          {
            number: 15500,
            priceSms: 1.62,
          },
          {
            number: 32000,
            priceSms: 1.6,
          },
          {
            number: 50000,
            priceSms: 1.6,
          },
          {
            number: 60000,
            priceSms: 1.6,
          },
          {
            number: 100000,
            priceSms: 1.6,
          },
          {
            number: 125000,
            priceSms: 1.6,
          },
          {
            number: 32000,
            priceSms: 1.6,
          },
          {
            number: 300000,
            priceSms: 1.6,
          },
          {
            number: 500000,
            priceSms: 1.6,
          },
          {
            number: 1000000,
            priceSms: 1.6,
          },
        ],
      },
      {
        category: 'сервисные',
        numberSms: [
          {
            number: 1,
            priceSms: 0.55,
          },
          {
            number: 1000,
            priceSms: 0.55,
          },
          {
            number: 2000,
            priceSms: 0.5,
          },
          {
            number: 4500,
            priceSms: 0.5,
          },
          {
            number: 6250,
            priceSms: 0.48,
          },
          {
            number: 15500,
            priceSms: 0.45,
          },
          {
            number: 32000,
            priceSms: 0.45,
          },
          {
            number: 50000,
            priceSms: 0.45,
          },
          {
            number: 60000,
            priceSms: 0.45,
          },
          {
            number: 100000,
            priceSms: 0.45,
          },
          {
            number: 125000,
            priceSms: 0.45,
          },
          {
            number: 32000,
            priceSms: 0.4,
          },
          {
            number: 300000,
            priceSms: 0.4,
          },
          {
            number: 500000,
            priceSms: 0.4,
          },
          {
            number: 1000000,
            priceSms: 0.4,
          },
        ],
      },
    ],
  },
  {
    name: 'Flash-call',
    radio: false,
    checkbox: false,
    lengthInput: false,
    codeLengthVisibility: true,
    codesLength: [
      {
        name: 4,
        numberSms: [
          {
            number: 1,
            priceSms: 1.75,
          },
          {
            number: 1000,
            priceSms: 1.7,
          },
          {
            number: 2000,
            priceSms: 1.68,
          },
          {
            number: 4500,
            priceSms: 1.65,
          },
          {
            number: 6250,
            priceSms: 1.65,
          },
          {
            number: 15500,
            priceSms: 1.62,
          },
          {
            number: 32000,
            priceSms: 1.6,
          },
          {
            number: 50000,
            priceSms: 1.6,
          },
          {
            number: 60000,
            priceSms: 1.6,
          },
          {
            number: 100000,
            priceSms: 1.6,
          },
          {
            number: 125000,
            priceSms: 1.6,
          },
          {
            number: 32000,
            priceSms: 1.6,
          },
          {
            number: 300000,
            priceSms: 1.6,
          },
          {
            number: 500000,
            priceSms: 1.6,
          },
          {
            number: 1000000,
            priceSms: 1.6,
          },
        ],
      },
      {
        name: 6,
        numberSms: [
          {
            number: 1,
            priceSms: 0.55,
          },
          {
            number: 1000,
            priceSms: 0.55,
          },
          {
            number: 2000,
            priceSms: 0.5,
          },
          {
            number: 4500,
            priceSms: 0.5,
          },
          {
            number: 6250,
            priceSms: 0.48,
          },
          {
            number: 15500,
            priceSms: 0.45,
          },
          {
            number: 32000,
            priceSms: 0.45,
          },
          {
            number: 50000,
            priceSms: 0.45,
          },
          {
            number: 60000,
            priceSms: 0.45,
          },
          {
            number: 100000,
            priceSms: 0.45,
          },
          {
            number: 125000,
            priceSms: 0.45,
          },
          {
            number: 32000,
            priceSms: 0.4,
          },
          {
            number: 300000,
            priceSms: 0.4,
          },
          {
            number: 500000,
            priceSms: 0.4,
          },
          {
            number: 1000000,
            priceSms: 0.4,
          },
        ],
      },
    ],
  },
  {
    name: 'VK и OK рассылка',
    radio: false,
    checkbox: false,
    lengthInput: false,
    codeLengthVisibility: false,
    numberSms: [
      {
        number: 1,
        priceSms: 0.55,
      },
      {
        number: 2000,
        priceSms: 0.5,
      },
      {
        number: 6250,
        priceSms: 0.48,
      },
      {
        number: 15500,
        priceSms: 0.45,
      },
      {
        number: 60000,
        priceSms: 0.42,
      },
      {
        number: 125000,
        priceSms: 0.4,
      },
      {
        number: 250000,
        priceSms: 0.35,
      },
      {
        number: 500000,
        priceSms: 0.3,
      },
      {
        number: 1000000,
        priceSms: 0.3,
      },
    ],
  },
  {
    name: 'HLR-рассылка',
    radio: false,
    checkbox: false,
    lengthInput: false,
    codeLengthVisibility: false,
    numberSms: [
      {
        number: 1,
        priceSms: 0.35,
      },
      {
        number: 3500,
        priceSms: 0.3,
      },
      {
        number: 10700,
        priceSms: 0.28,
      },
      {
        number: 26000,
        priceSms: 0.27,
      },
      {
        number: 96000,
        priceSms: 0.26,
      },
      {
        number: 200000,
        priceSms: 0.25,
      },
      {
        number: 500000,
        priceSms: 0.25,
      },
    ],
  },
  {
    name: 'Ping-SMS',
    radio: false,
    checkbox: false,
    lengthInput: false,
    codeLengthVisibility: false,
    numberSms: [
      {
        number: 1,
        priceSms: 2.14,
      },
      {
        number: 1400,
        priceSms: 2.11,
      },
      {
        number: 3300,
        priceSms: 2.08,
      },
      {
        number: 12000,
        priceSms: 2.05,
      },
      {
        number: 24600,
        priceSms: 2.03,
      },
      {
        number: 50000,
        priceSms: 2.03,
      },
      {
        number: 100000,
        priceSms: 2.03,
      },
    ],
  },
  {
    name: 'Голосовые сообщения',
    radio: false,
    checkbox: false,
    lengthInput: true,
    codeLengthVisibility: false,
    numberSms: [
      {
        number: 1,
        priceSms: 0.07,
      },
      {
        number: 2800,
        priceSms: 0.06,
      },
      {
        number: 23000,
        priceSms: 0.06,
      },
      {
        number: 86000,
        priceSms: 0.05,
      },
      {
        number: 200000,
        priceSms: 0.04,
      },
    ],
  },
];

const regionsComponent = Vue.component('v-select', {
  template: `
        <div class="v-select">
            <p class="current" @click="arOptionsVisible = !arOptionsVisible">
            {{ selected }}
            </p>
            <div class="options" v-if="arOptionsVisible">
            <span
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
            >
                {{ option.name }}
            </span>
            </div>
        </div>
        `,
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      arOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);
      this.arOptionsVisible = false;
    },
    hideSelect() {
      this.arOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelect);
  },
});

new Vue({
  el: '#app',
  component: regionsComponent,
  data: () => ({
    servicesData: serviceData,
    inputVisibility: true,
    codeLengthVisibility: false,
    select: serviceData[0].name,
    selectCode: 4,
    priceOneSms: serviceData[0].nameTypeArray[0].numberSms[0].priceSms,
    checkbox: serviceData[0].checkbox,
    radio: serviceData[0].radio,
    lengthInput: serviceData[0].lengthInput,
    serviceData: serviceData[0],
    numbersSms: serviceData[0].nameTypeArray[0].numberSms,
    rangeMin: '',
    rangeMax: '',
    numberInput: 50,
    codesLength: [],
  }),
  methods: {
    optionSelect(option) {
      this.select = option.name;
      this.radio = option.radio;
      this.checkbox = option.checkbox;
      this.lengthInput = option.lengthInput;
      this.codeLengthVisibility = option.codeLengthVisibility;
      this.serviceData = option;
      this.sort();
    },
    range() {
      this.rangeMin = this.numbersSms[0].number;
      this.rangeMax = this.numbersSms[this.numbersSms.length - 1].number;
      this.numberInput = this.rangeMin;
      this.priceOneSms = this.numbersSms[0].priceSms;
    },
    optionSms() {
      this.numbersSms =
        this.serviceData.nameTypeArray[1].categories[0].numberSms;
      this.range();
      document.querySelector('.checkbox-input').checked = false;
    },
    optionViber() {
      this.numbersSms = this.serviceData.categories[0].numberSms;
      this.range();
      document.querySelector('.checkbox-input').checked = false;
    },
    optionFlash() {
      this.numbersSms = this.serviceData.codesLength[0].numberSms;
      this.codesLength = this.serviceData.codesLength;
      this.range();
    },
    optionElse() {
      this.numbersSms = this.serviceData.numberSms;
      this.range();
    },
    optionSelectCode(option) {
      this.selectCode = option.name;
      this.numbersSms = option.numberSms;
      this.range();
    },
    optionRadio2() {
      this.numbersSms = this.serviceData.nameTypeArray[0].numberSms;
      this.range();
      this.checkbox = false;
    },
    optionRadio1() {
      this.numbersSms =
        this.serviceData.nameTypeArray[1].categories[0].numberSms;
      this.range();
      this.checkbox = true;
    },
    optionCheck() {
      if (this.select == 'VIBER-рассылка') {
        if (document.querySelector('.checkbox-input').checked) {
          this.numbersSms = this.serviceData.categories[1].numberSms;
          this.range();
        } else {
          this.numbersSms = this.serviceData.categories[0].numberSms;
          this.range();
        }
      } else if (this.select == 'SMS рассылка') {
        if (document.querySelector('.checkbox-input').checked) {
          this.numbersSms =
            this.serviceData.nameTypeArray[1].categories[1].numberSms;
          this.range();
        } else {
          this.numbersSms =
            this.serviceData.nameTypeArray[1].categories[0].numberSms;
          this.range();
        }
      }
    },
    sort() {
      if (this.select == 'SMS рассылка') {
        this.optionSms();
      } else if (this.select == 'VIBER-рассылка') {
        this.optionViber();
      } else if (this.select == 'Flash-call') {
        this.optionFlash();
      } else {
        this.optionElse();
      }
    },
  },
  computed: {
    priceOne() {
      return [...this.numbersSms]
        .reverse()
        .find((n) => n.number <= this.numberInput).priceSms;
    },
    priceAll() {
      return parseFloat((this.priceOne * this.numberInput).toFixed(2));
    },
  },
  beforeMount() {
    return this.sort();
  },
  filters: {
    splitNumber: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
});
