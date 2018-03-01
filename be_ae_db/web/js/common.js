// 将前端ajax请求的端口用变量在common.js中存放起来方便维护
var common=common || {};
common.baseUrl='http://localhost:8082/';
// 二次封装
common.http={
    get(_api,_params,_cb){
        _api=_api.startsWith('http')?_api:common.baseUrl +_api;
        $.get(_api, _params || {}, function(res){
            if(!res.status && res.error == 'unauthorized'){
                window.location.href = 'login.html';
            } else {
                _cb(res);
            }
            //hide loading
        })
    },
     post(_api, _params, _cb){
        //show up loading
        _api = _api.startsWith('http') ? _api : common.baseUrl + _api;
        $.post(_api, _params || {}, function(res){
            if(!res.status && res.error == 'unauthorized'){
                window.location.href = 'login.html';
            } else {
                _cb(res);
            }
            //hide loading
        })        
    }
}