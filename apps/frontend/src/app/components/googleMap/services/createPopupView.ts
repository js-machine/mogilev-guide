import rightArrow from '../../../../assets/icons/right-arrow.svg';

export function createPopupView(): Element {
  const popupView = document.createElement('div');
  const imageElement = document.createElement('img');
  imageElement.id = 'to-sight-button';
  imageElement.src = rightArrow;
  popupView.appendChild(imageElement);
  return popupView;
}