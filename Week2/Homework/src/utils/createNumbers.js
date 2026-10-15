function createNumbers(start, count) {
  return Array.from({ length: count }, (_, index) => start + index);
}

export default createNumbers;
