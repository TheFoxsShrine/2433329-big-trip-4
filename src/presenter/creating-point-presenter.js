import { EditType, BASE_POINT, ActionType } from '../const.js';
import {
  RenderPosition,
  remove,
  render,
} from '../framework/render.js';

import PointEditorView from '../view/point-editor-view.js';
import CreatePointButtonView from '../view/create-button-view.js';

export default class CreatePointPresenter {
  #container = null;
  #editorContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #createPointButtonComponent = null;
  #pointEditorComponent = null;
  #onUserAction = null;

  constructor({ container, editorContainer, destinationsModel, offersModel }) {
    this.#container = container;
    this.#editorContainer = editorContainer;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(onUserAction) {
    if (this.#createPointButtonComponent) {
      throw new Error('Cannot init create point button twice');
    }

    this.#onUserAction = onUserAction;
    this.#createPointButtonComponent = new CreatePointButtonView({ onClick: this.#createPointClickHandler });
    render(this.#createPointButtonComponent, this.#container);
  }

  resetView() {
    if (!this.#pointEditorComponent) {
      return;
    }

    remove(this.#pointEditorComponent);
    this.#pointEditorComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    if (this.#createPointButtonComponent) {
      this.setButtonDisabled(false);
    }
  }

  triggerError() {
    this.#pointEditorComponent.shake(() => {
      this.#pointEditorComponent.setCreating(false);
    });
  }

  setButtonDisabled(disabled) {
    if (this.#createPointButtonComponent) {
      this.#createPointButtonComponent.setDisabled(disabled);
    }
  }

  #createPointClickHandler = () => {
    if (this.#pointEditorComponent) {
      return;
    }

    this.#pointEditorComponent = new PointEditorView({
      point: BASE_POINT,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onCloseClick: this.#cancelClickHandler,
      onDeleteClick: this.#cancelClickHandler,
      onSubmitForm: this.#formSubmitHandler,
      mode: EditType.CREATING
    });

    render(this.#pointEditorComponent, this.#editorContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.setButtonDisabled(true);
  };

  #cancelClickHandler = () => {
    this.resetView();
  };

  #formSubmitHandler = async (point) => {
    this.#pointEditorComponent.setCreating(true);
    await this.#onUserAction(ActionType.CREATE_POINT, point);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.resetView();
    }
  };
}
