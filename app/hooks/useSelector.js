import useStore from './useStore';

// [TODO] use reselect or make it memoize
export default function useSelector(selector) {
  const { store } = useStore();

  return selector(store);
}
