export const statusMatcher = (status) => {
  let number;
  switch (status) {
    case 'Pending':
      number = 2;
      break;
    case 'Accepted':
      number = 3;
      break;
    case undefined:
    default:
      number = 0;
      break;
  }
  return number;
};