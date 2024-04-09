import AbstractView from '../framework/view/abstract-view';
import { createPointTemplate } from '../view/point-template';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor({point, pointDestination, pointOffers}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return createPointTemplate;
  }
}
