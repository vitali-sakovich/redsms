class CalculatorPage {
  name = 'Тайтл';
  actions = [];
  elements = [];
  active = false;
  price = { one: 0, all: 0, num: 0 };

  constructor(args) {
    this.name = args.name;
    this.elements = args.elements;

    this.actions = this.elements.map((e) => e.action);
    // this.actions = args.actions

    this.calcNode = document.querySelector('.js_calculator');
    this.elementsNode = document.querySelector('.js_elements');

    this.priceOneNode = this.calcNode.querySelector('.js-price-one');
    this.priceAllNode = this.calcNode.querySelector('.js-price-all');

    this.elements.map((e) => e.setPage(this));
  }

  render() {
    if (!this.active) {
      return;
    }

    this.calcNode.querySelector('.current').innerText = this.name;

    this.elementsNode.innerHTML = '';
    this.elementsNode.append(...this.elements.map((e) => e.render()));

    this.renderPrice();
  }

  renderPrice() {
    this.price = this.elements.reduce((p, c) => c.action(p), this.price);
    this.price.one = Math.ceil(this.price.one * 100) / 100;
    this.price.all = Math.ceil(this.price.all * 100) / 100;
    this.price.one = this.price.one.toFixed(2);
    this.price.all = this.price.all.toFixed(2);

    this.priceOneNode.innerText = ` ~ ${this.price.one}`;
    this.priceAllNode.innerText = ` ~ ${this.price.all}`;
  }
}

class CalculatorElement {
  action = (...args) => {
    return args;
  };
  template = ``;
  params = {};
  page = undefined;

  constructor(args) {
    // this.action = args.action
    this.template = args.template;
    this.params = args.params;
    this.hint = args.hint;
  }

  setPage(page) {
    this.page = page;
  }

  render() {
    console.error('called abstract class');
    return this.template;
  }
}

class CalculatorElementAmount extends CalculatorElement {
  amount = 0;
  action = ({ one, all, num }) => {
    one = this.priceSelected || this.params.numberSms[0].priceSms;
    num = this.amount || this.params.numberSms[0].number;
    all = one * num;
    return { one, all, num };
  };

  constructor(args) {
    super(args); // вызов родительского конструктора
    this.hint = args.hint;
    this.action = this.action.bind(this);
    this.priceSelected = this.params.numberSms[0].priceSms;
  }

  render() {
    var html = `
<div class="calculator__bottom">
  <div class="select">
    <span class="select-name">Количество сообщений</span>
    <label>
      <input type="number" class="input-number js-main-input" />
    </label>
  </div>
  <div class="range__box">
    <div class="range__inner">
      <input
        type="range"
        min="${this.params.numberSms[0].number}"
        max="${this.params.numberSms[this.params.numberSms.length - 1].number}"
        step="1"
        name="range"
        class="range js-second-input"
      />
    </div>
    <div class="range__number">
      ${this.params.numberSms
        .map(({ number }) => `<span>${number}</span>`)
        .join('\n')}
    </div>
    <div class="prompt">
      <div class="prompt-btn">
        <img src="./img/prompt.svg" alt="">
      </div>
      <div class="prompt-info">
        ${this.hint}
      </div>
    </div>
  </div>
</div>
`;
    this.container = document.createElement('div');
    this.container.classList.add('calc-elem__num');
    this.container.innerHTML = html;

    this.mainInputNode = this.container.querySelector('.js-main-input');
    this.secondInputNode = this.container.querySelector('.js-second-input');

    this.mainInputNode.value = this.params.numberSms[0].number;
    this.secondInputNode.value = this.params.numberSms[0].number;

    this.addListeners();
    return this.container;
  }

  addListeners() {
    var firstInputAction = (e) => {
      this.mainInputNode.value = parseInt(this.mainInputNode.value);
      this.amount = this.mainInputNode.value;
      this.secondInputNode.value = this.amount;
      this.onChange();
    };

    this.mainInputNode.addEventListener('change', firstInputAction);
    this.mainInputNode.addEventListener('input', firstInputAction);
    this.mainInputNode.addEventListener('keyup', firstInputAction);

    var secondInputAction = (e) => {
      this.amount = this.secondInputNode.value;
      this.mainInputNode.value = this.amount;
      this.onChange();
    };
    this.secondInputNode.addEventListener('change', secondInputAction);
    this.secondInputNode.addEventListener('input', secondInputAction);
  }

  setValue(value) {
    value = parseInt(value);
    if (this.amount == value) {
      return;
    }

    this.amount = value;
    this.onChange();
  }

  onChange() {
    this.priceSelected = [...this.params.numberSms]
      .reverse()
      .find((n) => n.number <= this.amount).priceSms;
    this.page.renderPrice();
  }
}

class CalculatorElementRadio extends CalculatorElement {
  action = ({ one, all, num }) => {
    return { one, all, num };
  };

  constructor(args) {
    super(args); // вызов родительского конструктора
    this.action = this.action.bind(this);
    this.priceList = args.priceList;
    this.checked = args.checked || false;

    this.inputName = args.inputName;
    this.name = args.name;
  }

  setPage(page) {
    this.page = page;
    this.priceList.setPage(page);
  }

  render() {
    var html = `
<div class="radio">
  <label>
    <input
      type="radio"
      ${this.checked ? 'checked' : ''}
      name="${this.inputName}"
      class="radio-input js-main-input"
    />
    <span class="radio-data"></span>
    <span class="radio-name">${this.name}</span>
  </label>
  <div class="prompt">
    <div class="prompt-btn">
      <img src="../img/prompt.svg" alt="" />
    </div>
    <div class="prompt-info">
      ${this.hint}
    </div>
  </div>
</div>
`;
    this.container = document.createElement('div');
    this.container.classList.add('calc-elem__radio');
    this.container.innerHTML = html;

    this.mainInputNode = this.container.querySelector('.js-main-input');

    this.addListeners();

    return this.container;
  }

  addListeners() {
    var firstInputAction = (e) => {
      this.checked = this.mainInputNode.checked;

      this.onChange();
    };

    this.mainInputNode.addEventListener('change', firstInputAction);
  }

  onChange() {
    this.page.elements = this.page.elements.map((e) => {
      if (e instanceof CalculatorElementAmount) {
        return this.priceList;
      }

      if (e instanceof CalculatorElementRadio) {
        if (e.inputName == this.inputName && e != this) {
          e.checked = !this.mainInputNode.checked;
        }
      }
      return e;
    });

    this.priceList.setValue(this.page.price.num);

    this.page.render();
  }
}

class CalculatorElementCheckbox extends CalculatorElement {
  action = ({ one, all, num }) => {
    return { one, all, num };
  };

  constructor(args) {
    super(args); // вызов родительского конструктора
    this.action = this.action.bind(this);
    this.priceList = args.priceList;
    this.checked = args.checked || false;

    this.inputName = args.inputName;
    this.name = args.name;
  }

  setPage(page) {
    this.page = page;
    this.priceList.setPage(page);
  }

  render() {
    var html = `
<div class="checkbox">
  <label>
    <input
      type="checkbox"
      ${this.checked ? 'checked' : ''}
      name="${this.inputName}"
      class="checkbox-input js-main-checkbox"
    />
    <span class="checkbox__data"></span>
    <span class="checkbox-name">${this.name}</span>
  </label>
  <div class="prompt">
    <div class="prompt-btn">
      <img src="../img/prompt.svg" alt="" />
    </div>
    <div class="prompt-info">
      ${this.hint}
    </div>
  </div>
</div>
`;
    this.container = document.createElement('div');
    this.container.classList.add('calc-elem__checkbox');
    this.container.innerHTML = html;

    this.mainInputNode = this.container.querySelector('.js-main-checkbox');

    this.addListeners();

    return this.container;
  }

  addListeners() {
    var firstInputAction = (e) => {
      this.checked = this.mainInputNode.checked;

      this.onChange();
    };

    this.mainInputNode.addEventListener('change', firstInputAction);
  }
  onChange() {
    this.page.elements = this.page.elements.map((e) => {
      if (e instanceof CalculatorElementAmount) {
        return this.priceList;
      }

      if (e instanceof CalculatorElementCheckbox) {
        if (e.inputName == this.inputName && e != this) {
          e.checked = !this.mainInputNode.checked;
        }
      }
      return e;
    });

    this.priceList.setValue(this.page.price.num);

    this.page.render();
  }
}

class CalculatorElementSelect extends CalculatorElement {
  action = ({ one, all, num }) => {
    return { one, all, num };
  };

  constructor(args) {
    super(args); // вызов родительского конструктора
    this.action = this.action.bind(this);
    this.priceList = args.priceList;

    this.name = args.name;
  }

  setPage(page) {
    this.page = page;
    this.priceList.setPage(page);
  }

  render() {
    var html = `
    <div class="select">
    <span class="select-name">${this.name}</span>
      <div class="v-select">
        <p class="current js-current">4</p>
        <div class="options js-options">
        <span>SMS рассылка</span>
      </div>
    </div>
`;
    this.container = document.createElement('div');
    this.container.classList.add('calc-elem__select');
    this.container.innerHTML = html;
    return this.container;
  }
}

// ----------------------------------------

var calculatorPages = [
  new CalculatorPage({
    name: 'SMS рассылка',
    elements: [
      new CalculatorElementRadio({
        hint: 'Какая-то подсказка',
        name: 'Платное имя',
        inputName: 'name-type',
        checked: true,
        priceList: new CalculatorElementAmount({
          hint: 'Какая-то подсказка',
          params: {
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
        }),
      }),
      new CalculatorElementRadio({
        hint: 'Какая-то подсказка',
        name: 'Бесплатное имя',
        inputName: 'name-type',
        checked: false,
        priceList: new CalculatorElementAmount({
          hint: 'Какая-то подсказка',
          params: {
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
        }),
      }),
      new CalculatorElementCheckbox({
        hint: 'Какая-то подсказка',
        name: 'Сервисный трафик',
        inputName: 'name',
        checked: false,
        priceList: new CalculatorElementAmount({
          hint: 'Какая-то подсказка',
          params: {
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
        }),
      }),
      new CalculatorElementAmount({
        hint: 'Какая-то подсказка',
        params: {
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
      }),
    ],
  }),
  new CalculatorPage({
    name: 'VIBER-рассылка',
    elements: [
      new CalculatorElementCheckbox({
        hint: 'Какая-то подсказка',
        name: 'Сервисный трафик',
        inputName: 'name',
        checked: false,
        priceList: new CalculatorElementAmount({
          hint: 'Какая-то подсказка',
          params: {
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
        }),
      }),
      new CalculatorElementAmount({
        hint: 'Какая-то подсказка',
        params: {
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
      }),
    ],
  }),
  new CalculatorPage({
    name: 'Flash-call',
    elements: [
      new CalculatorElementSelect({
        hint: 'Какая-то подсказка',
        name: 'Длина кода',
        priceList: new CalculatorElementAmount({
          hint: 'Какая-то подсказка',
          params: {
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
        }),
      }),
      new CalculatorElementAmount({
        hint: 'Какая-то подсказка',
        params: {
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
      }),
    ],
  }),
  new CalculatorPage({
    name: 'VK и OK рассылка',
    elements: [
      new CalculatorElementAmount({
        hint: 'Какая-то подсказка',
        params: {
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
      }),
    ],
  }),
  new CalculatorPage({
    name: 'HLR-рассылка',
    elements: [
      new CalculatorElementAmount({
        hint: 'Подсказка',
        params: {
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
      }),
    ],
  }),
  new CalculatorPage({
    name: 'Ping-SMS',
    elements: [
      new CalculatorElementAmount({
        hint: 'Подсказка',
        params: {
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
      }),
    ],
  }),
  new CalculatorPage({
    name: 'Голосовые сообщения',
    elements: [
      new CalculatorElementAmount({
        hint: 'Подсказка',
        params: {
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
      }),
    ],
  }),
];

let numPage = 0;
calculatorPages[numPage].active = true;
calculatorPages.map((p) => p.render());

function setActive(name) {
  calculatorPages.map((p) => {
    p.active = p.name == name;
    p.render();
  });
}

var select = () => {
  const selectoption = document.querySelector('.v-select .options');
  const current = document.querySelector('.v-select .current');
  calculatorPages.forEach((i) => {
    const span = document.createElement('span');
    span.textContent = i.name;
    selectoption.appendChild(span);
  });

  selectoption.addEventListener('click', (e) => {
    let span = e.target.closest('span');
    if (!span) return;
    if (!selectoption.contains(span)) return;
    setActive(span.textContent);
    selectoption.style.display = 'none';
    current.classList.remove('active');
  });

  current.addEventListener('click', () => {
    current.classList.add('active');
    selectoption.style.display = 'block';
  });
};
select();
