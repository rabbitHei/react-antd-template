import axios from "axios";

// 常用数据计算 & SDK功能
export const Http = {
  get: ({ url, data }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: url,
        params: data,
        withCredentials: true, // 允许携带cookie
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
  post: ({ url, data }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: data,
        withCredentials: true, // 允许携带cookie
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
  delete: ({ url }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: url,
        withCredentials: true, // 允许携带cookie
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
  form: ({ url, data }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: data,
        headers: {
          "content-type": "multipart/form-data",
        },
        timeout: 20000,
        withCredentials: false,
      }).then((resp) => {
        resolve(resp);
      }, reject);
    });
  },
};

export const toast = {
  error: (txt, time) => {
    let style =
      "display: inline-block;max-width:228px;background: rgb(0,0,0);color:#EA6347;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  info: (txt, time) => {
    let style =
      "display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  suc: (txt, time) => {
    let style =
      "display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0.8;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  updateHtml: (txt, time) => {
    let style =
      "display: inline-block;background: rgb(0,0,0);color:#fff;font-size:14px;opacity:0;line-height:20px;padding: 10px 20px;border-radius: 5px;box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: all;";
    toast.toast(txt, time, style);
  },
  toast: (txt, time, style) => {
    let body = document.querySelector("body");
    let p = document.createElement("p");
    let span = document.createElement("span");
    // p.style = 'width:100%;position:fixed;top:50%;left:0;transform: translateY(-50%);height:40px;display:flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999'
    p.setAttribute(
      "style",
      "width:100%;position:fixed;top:50%;left:0;transform: translateY(-50%);height:40px;display:flex;flex-direction: row;justify-content: center;align-items: center;z-index:9999"
    );
    span.innerText = txt;
    // span.style = style; //兼容低版本不能这么写
    span.setAttribute("style", style);
    p.appendChild(span);
    body.appendChild(p);
    let timer = setTimeout(() => {
      clearTimeout(timer);
      body.removeChild(p);
    }, time || 1600);
  },
};

export const timeToString = (time, format) => {
  //时间转化
  let t = new Date(time);
  let tf = function (i) {
    return (i < 10 ? "0" : "") + i;
  };
  let tfNoZroe = function (i) {
    return i + "";
  };
  return format.replace(/yyyy|MM|M|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear());
        break;
      case "MM":
        return tf(t.getMonth() + 1);
        break;
      case "M":
        return tfNoZroe(t.getMonth() + 1);
        break;
      case "mm":
        return tf(t.getMinutes());
        break;
      case "dd":
        return tf(t.getDate());
        break;
      case "HH":
        return tf(t.getHours());
        break;
      case "ss":
        return tf(t.getSeconds());
        break;
    }
  });
};

export const numCalc = (num, unit, fixed) => {
  //数字默认转化
  //num 传入数 fixed 保留小数位数 unit 单位{} k_del:true 代表删除千的匹配
  let result = 0;
  let unitTmp = Object.assign(
    { k: "千", w: "万", kw: "千万", y: "亿" },
    unit || {}
  );
  let fixedTmp = fixed === 0 ? 0 : fixed ? fixed : 1;

  if (num >= 0) {
    result = num;
    if (num < 1000) {
      result = num;
    } else if (num < 10000) {
      //千
      if (unitTmp.k_del) return num;
      result = ratioCalc(num / 1000, fixedTmp) + unitTmp.k;
    } else if (num < 10000000) {
      //万
      if (unitTmp.w_del) return num;
      result = ratioCalc(num / 10000, fixedTmp) + unitTmp.w;
    } else if (num < 100000000) {
      //千万
      if (unitTmp.kw_del) return num;
      result = ratioCalc(num / 10000000, fixedTmp) + unitTmp.kw;
    } else if (num >= 100000000) {
      //亿
      if (unitTmp.kw_del) return num;
      result = ratioCalc(num / 100000000, fixedTmp) + unitTmp.y;
    }
  }
  return result;
};

export const ratioCalc = (num, fixed) => {
  //保留小数 & 去末尾0处理 1.0 -> 1
  //num 传入浮点数 fixed 保留小数位数
  let tmpNum = "0";
  if (num && num !== 0) {
    num = Math.abs(num);
    tmpNum = num + "";
    let index = (num + "").indexOf(".");
    if (index > 0) {
      let arr = tmpNum.split("");
      let left = tmpNum.slice(0, index);
      let right = "";
      arr.forEach((v, i) => {
        if (i > index && i <= index + fixed) {
          right = right + v;
        }
      });
      if (right > 0) {
        tmpNum = left + "." + right;
      } else {
        tmpNum = left;
      }
    }
  }
  return tmpNum;
};

export const timeCalc = (time) => {
  //计算时间距离现在长久
  let str = "";
  if (+time) {
    let newTime = +time;
    let nowTime = Date.now();
    if (nowTime - newTime < 60 * 60 * 1000) {
      //一小时内
      str = "刚刚";
    } else if (nowTime - newTime < 24 * 60 * 60 * 1000) {
      //一天内
      str = Math.floor((nowTime - newTime) / (60 * 60 * 1000)) + "小时前";
    } else {
      //超过一天
      str = Math.floor((nowTime - newTime) / (24 * 60 * 60 * 1000)) + "天前";
    }
  } else {
    str = "刚刚";
  }
  return str;
};

export const loadJs = (srcEnd) => {
  //手动加载JS
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = srcEnd;
  document.getElementsByTagName("body")[0].appendChild(script);
};

export const endTime = (endTime) => {
  //计算时间距离现在还有多少年、月、天
  if (!endTime) return "0天";
  let nowTime = Date.now();
  if (nowTime >= endTime) return "已过期";
  let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //闰年
  let simpleYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //平年
  let yearArr = [leapYear, simpleYear];

  let now = new Date(nowTime);
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth();
  let nowDay = now.getDate();
  let nowIsLeap = nowYear % 4 === 0 ? 0 : 1;

  let end = new Date(endTime);
  let endYear = end.getFullYear();
  let endMonth = end.getMonth();
  let endDay = end.getDate();
  // let endIsLeap = endYear % 4 === 0 ? 0 : 1;
  // console.log(endYear,endMonth,endDay);
  // console.log(nowYear,nowMonth,nowDay);

  let day = endDay - nowDay;
  let month = endMonth - nowMonth;
  let year = endYear - nowYear;

  if (day < 0) {
    day += yearArr[nowIsLeap][nowMonth];
    month -= 1;
  }
  if (month < 0) {
    month += 12;
    year -= 1;
  }
  // console.log(year, month, day);
  let str = "";
  year && (str += `${year}年`);
  month && (str += `${month}月`);
  day && (str += `${day}月`);

  return str;
};
