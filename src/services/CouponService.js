import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "coupon";
//localhost:81/greenreturn_api/Coupon/
class CouponService {
  //Definición para Llamar al API y obtener el listado de Coupon
  //localhost:81/greenreturn_api/Coupon
  getCoupon() {
    return axios.get(BASE_URL);
  }

  getAvailableCoupons() {
    return axios.get(BASE_URL + /availableCoupons/ + 1);
  }

  //localhost:81/greenreturn_api/Coupon/1
  getCouponById(CouponId) {
    return axios.get(BASE_URL + "/" + CouponId);
  }


  createCoupon(Coupon) {
    return axios.post(BASE_URL, Coupon);
  }

  updateCoupon(Coupon) {
    return axios.post(BASE_URL + "/updateCoupon/", Coupon);
  }

}
export default new CouponService();
