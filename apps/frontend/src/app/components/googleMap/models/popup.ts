export interface Popup extends google.maps.OverlayView {
  position: google.maps.LatLng;
  content: Element;
  text: string;
  handlePopupClick: () => void;
}

/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
export function createPopupClass() {
  function Popup(
    position: google.maps.LatLng,
    content: Element,
    text: string,
    handlePopupClick: () => void
  ) {
    this.position = position;
    this.text = text;
    this.handlePopupClick = handlePopupClick;

    this.contentText = document.createElement('h3');
    this.contentText.style.margin = '0px';

    content.classList.add('popup-bubble');
    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    content.appendChild(this.contentText);
    this.containerDiv.appendChild(content);

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    const divPosition = this.getProjection().fromLatLngToDivPixel(
      this.position
    );
    this.contentText.innerHTML = this.text;
    this.containerDiv.querySelector('img').onclick = this.handlePopupClick;

    // Hide the popup when it is far out of view.
    const display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? 'block'
        : 'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Popup;
}
