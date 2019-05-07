import { urlParse, isPlainObject } from 'src/utils';
import { PRODUCTION } from 'src/constant/main';

export default function devCheckLogin(history) {
  // if (PRODUCTION) return;
  const urlparam = urlParse(location);
  if (isPlainObject(urlparam)) return;
  // document.cookie = `token=${escape(urlparam.token)};expire=${new Date().getTime() + 24 * 3600 * 1000};path=/;`;
  localStorage.token = urlparam.token;
  history.replace('/');
}
