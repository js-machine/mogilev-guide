import { PLACE_MARKER_ICON } from '../models/constants';

export function createMarkerIcon(radius: number, isSelected = false): string {
  const canvas = document.createElement('canvas');
  canvas.width = radius;
  canvas.height = radius;

  const context = canvas.getContext('2d');
  context.clearRect(
    PLACE_MARKER_ICON.CANVAS_CLEAR_RECT_X,
    PLACE_MARKER_ICON.CANVAS_CLEAR_RECT_Y,
    radius,
    radius
  );
  context.fillStyle = isSelected
    ? PLACE_MARKER_ICON.FILL_COLOR_SELECTED
    : PLACE_MARKER_ICON.FILL_COLOR_DEFAULT;
  context.strokeStyle = PLACE_MARKER_ICON.STROKE_COLOR;
  context.lineWidth = PLACE_MARKER_ICON.LINE_WIDTH;
  context.shadowBlur = PLACE_MARKER_ICON.SHADOW_BLUR;
  context.shadowColor = PLACE_MARKER_ICON.FILL_COLOR_DEFAULT;
  context.beginPath();
  context.arc(
    radius / 2,
    radius / 2,
    radius / 2 - PLACE_MARKER_ICON.LINE_WIDTH,
    PLACE_MARKER_ICON.ARC_START_ANGLE,
    2 * Math.PI,
    false
  );
  context.fill();
  context.stroke();

  return canvas.toDataURL();
}
