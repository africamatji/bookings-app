import { auth_store } from "./auth_store";

export default ({ app }, inject) => {
  inject('store', auth_store)
}
