import axios from 'axios';
let baseUrl = "/api/admin/"
export default async(url = '', type = 'GET', data = {}, method = 'ajax') => {
    type = type.toUpperCase();
    url = baseUrl + url;
    if (type == 'GET' || type == 'DELETE' ) {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    if (axios && method == 'axios') {
        let requestConfig = {
            method: type,
            timeout: 10000
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        return axios(url, requestConfig);
    } else {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST') {
            sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(sendData);
        var promise = new Promise(function (resolve, reject) {
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    console.log(requestObj.response)
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        let _data = {};
                        _data.data = obj;
                        resolve(_data);
                    } else {
                        reject(requestObj);
                    }
                }
            }
        });
        return promise;
    }

}
