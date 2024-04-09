import { createElement } from '../render';
import { createListFilterElement } from '../view/filter-template';


export default class ListFilterElement {
  getFilter(){
    return createListFilterElement();
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
