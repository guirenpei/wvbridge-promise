const getData = {
  fetchHomework: data => ({
    url: 'student/homework_bank/list',
    method: 'POST',
    data: { chosen_homework_list: data }
  }),
  fetchHomeworkAdd: data => ({
    url: 'student/student_wrong_homework/add',
    method: 'POST',
    data: { data }
  }),
  fetchHomeworkGet: data => ({
    url: 'student/student_wrong_homework/get',
    method: 'POST',
    data
  }),
  fetchHomeworkDetail: data => ({
    url: 'student/homework/get',
    method: 'POST',
    data
  }),
  fetchHomeworkComplete: data => ({
    url: 'student/student_homework/add',
    method: 'POST',
    data
  }),
  fetchHomeworkMistake: data => ({
    url: 'student/wrong_homework_collection/get',
    method: 'POST',
    data
  })
};
const bridge = callback => {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

/**
 * @param {String} fn 注册的方法
 * @param {String} type 事件类型
 * @param {Object} data 向app传输的数据
 * @return {Promise} 返回一个Promise对象
 */
module.exports = ({ fn, type, data }) => {
  return new Promise((resolve, reject) => {
    bridge(wvBridge => {
      if (wvBridge.callHandler) {
        wvBridge.callHandler(fn, { type, data: fn === 'readyForFetch' ? getData[type](data) : null }, response => {
          if (!response) {
            reject();
          }
          resolve(response);
        });
      }
    });
  });
};