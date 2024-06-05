// 判断是否是微信环境
export const isWx = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") !== -1;
};

// 获取图片路径
export const getAssetUrl = (name: string, assetPath: string = ""): string => {
  // const prefixPath = path.join(,`../assets${assetPath}/`)
  const assetUrl = `../assets${assetPath}/${name}`;
  console.log(assetUrl);
  return new URL(assetUrl, import.meta.url).href;
};

interface MyObject {
  [key: string]: any;
}
interface customURL extends URL {
  params: MyObject;
}

// 获取url
export const getURL = (url?: string): customURL => {
  const _url = new URL(url || window.location.href);
  let params = _url.search
    .slice(1)
    .split("&")
    .reduce((acc: MyObject, cur) => {
      acc = acc || {};
      let curItem = cur.split("=");
      acc[curItem[0]] = curItem[1];
      Object.defineProperty(acc, curItem[0], {});
      return acc;
    }, {});
  return { ..._url, params };
};

export const getURLParams = (url?: string): MyObject => {
  const _url = getURL(url);
  return _url.params;
};

export const getURLParam = (url: string, key: string): string => {
  const params = getURLParams(url);
  return params[key];
};
