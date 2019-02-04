export default function lefePad(str, padLength, padstr) {
  const rest = padLength - str.toString().length;
  const result = str;
  if (rest < 0) {
    return str;
  }

  return padstr.repeat(rest) + result;
}
