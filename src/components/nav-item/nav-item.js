import template from "./nav-item.html";

export default {

  template: template,
  props: {
    label: {
      type: String,
      required: true
    }
  },
  methods: {

    onDelete: function() {

      alert("delete" + this.label);
    }
  }
};