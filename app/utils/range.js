export default function range(times) {
  return Array.from({ length: times }).map((v, i) => i);
}
