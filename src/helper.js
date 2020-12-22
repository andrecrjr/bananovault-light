export const addressReduce = (address) => {
  let firstPart = address.substring(0, 11);
  let secondPart = address.substring(55, 64);
  return `${firstPart}...${secondPart}`;
};
