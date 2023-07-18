export function isNumeric(value) {
  return /^\d+$/.test(value);
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

export const resizeText = ({
  element,
  elements,
  maxSize = 14,
  unit = "px",
}) => {
  (elements || [element]).forEach((el) => {
    const fontDifference = Math.floor(el.innerText.length / 25);
    el.style.fontSize = `${maxSize - fontDifference}${unit}`;
  });
};
