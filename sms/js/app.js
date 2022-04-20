const vCheckbox = Vue.component('v-checkbox', {
  template: `
        <div class="checkbox">
        <span></span>
        <input :type="type" :name="name" checked="checked">
        </div>
        `,
  props: {
    type: {
      type: String,
      default: 'radio',
    },
    name: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
});

new Vue({
  el: '#app',
  component: vCheckbox,
  data: () => ({}),
  methods: {},
});
