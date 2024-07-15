export function isEmptyOrWhitespace(value) {
    return !value || /^\s*$/.test(value);
  };