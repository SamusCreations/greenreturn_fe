import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "coupon_exchange";
// localhost:81/greenreturn_api/CouponExchange/

class CouponExchangeService {
  getAllCouponExchanges() {
    return axios.get(BASE_URL);
  }

  getCouponExchangeById(id) {
    return axios.get(BASE_URL + "/" + id);
  }

  getUserCouponExchangeHistory(userId) {
    return axios.get(BASE_URL + "/getUserHistory/" + userId);
  }

  createCouponExchange(couponExchangeData) {
    return axios.post(BASE_URL, couponExchangeData);
  }

  updateCouponExchange(couponExchangeData) {
    return axios.post(BASE_URL + "/update", couponExchangeData);
  }
}

export default new CouponExchangeService();
