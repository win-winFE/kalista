import sortBy from 'lodash/sortBy';

export const getPosition = (el) => {
  let xPosition = 0;
  let yPosition = 0;
  while (el) {
    if (el.tagName === "BODY") {
      const xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      const yScrollPos = el.scrollTop || document.documentElement.scrollTop;
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
};

export const getParams = (search) => {
  if (!search) return {};
  const vars = search.substring(1).split('&');
  const queryString = {};
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    if (typeof queryString[key] === 'undefined') {
      queryString[key] = decodeURIComponent(value);
    } else if (typeof queryString[key] === 'string') {
      queryString[key] = [queryString[key], decodeURIComponent(value)];
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
};

//过滤html标签
export function removeHtmlTag(text) {
  if (!text) {
    return ''
  }
  return text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

export const rippleAnimation = (e, callback = null) => {
  const {target, pageX, pageY} = e;
  if (target.tagName === 'SPAN') {
    return;
  }
  const el = target;
  const circleEl = el.childNodes[0];
  // 获取父元素的位置
  const {x, y} = getPosition(el.parentNode);
  circleEl.style.left = `${pageX - x}px`;
  circleEl.style.top = `${pageY - y}px`;
  circleEl.classList.add('is-active');
  setTimeout(() => {
    circleEl.classList.remove('is-active');
  }, 500);
  if (callback) {
    callback();
  }
};

//求笛卡儿积
export const calcDescartes = (array) => {
  if (array.length < 2) return array[0] && array[0].map(o => [o]) || [];
  return [].reduce.call(array, function (col, set) {
    let res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        let t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      })
    });
    return res;
  });
}

//数组比较相等
export const arrayEquals = (arr1, arr2, sortProperty = []) => {
  let _arr1 = sortBy(arr1, sortProperty);
  let _arr2 = sortBy(arr2, sortProperty);
  return JSON.stringify(_arr1) === JSON.stringify(_arr2)
}
