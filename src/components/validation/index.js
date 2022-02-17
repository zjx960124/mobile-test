import Vue from 'vue'
import Validation from './validation.vue'

let ValidationConstrutor = Vue.extend(Validation);
let instance;

const ValidationComponent = function(options = {}) {
  let userOnClose = options.onClose;
  let userOnSuccess = options.onSuccess;
  options.onClose = function() {
    ValidationComponent.closed(userOnClose);
  };
  options.onSuccess = function() {
    ValidationComponent.successd(userOnSuccess);
  };
  instance = new ValidationConstrutor({data: options});
  document.body.appendChild(instance.$mount().$el);
  return instance
};

ValidationComponent.closed = function (userOnClose) {
  if (typeof userOnClose === 'function') {
    userOnClose();
  }
};
ValidationComponent.successd = function (userOnSuccess) {
  if (typeof userOnSuccess === 'function') {
    userOnSuccess();
  }
};

export default ValidationComponent
