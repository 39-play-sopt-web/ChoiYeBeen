function solution(num_list) {
  let odd = "";
  let even = "";
  num_list.forEach((num) => {
    if (num % 2 === 1) {
      odd += num;
    } else {
      even += num;
    }
  });
  return Number(odd) + Number(even);
}
