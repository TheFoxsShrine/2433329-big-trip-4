import { createElement } from '../render';
import { createPointTemplate } from '../point-template';

export default class PointView {
  constructor({point, pointDestination, pointOffers}) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getFilter() {
    return createPointTemplate ({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers: this.pointOffers
    });
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getFilter());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
