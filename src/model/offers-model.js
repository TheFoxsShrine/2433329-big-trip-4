//Модель для хранения данных для цен

export default class OffersModel {
  #service = null;
  #offers = null;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get() {
    return this.#offers;
  }

  getById(type) {
    return this.#offers
      .find((offer) => offer.type === type).offers;
  }
}
