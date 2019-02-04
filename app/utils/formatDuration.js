import leftPad from './leftPad';

export default function formatDuration(duration) {
  const minute = leftPad(Math.floor(duration / 60), 2, '0');
  const second = leftPad(Math.floor(duration % 60), 2, '0');
  return `${minute} : ${second}`;
}
