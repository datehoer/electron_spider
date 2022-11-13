const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const HttpsProxyAgent = require('https-proxy-agent');
async function get_html(url, method='GET', type='html', headers, timeout=10, proxy='', body={}){
    let header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "Referer": url
    }
    let controller = new AbortController();
    let http_agent = ''
    if(Array.isArray(proxy)){
        http_agent = new HttpsProxyAgent(proxy[Math.floor(Math.random() * proxy.length)])
    }else if(proxy != ''){
        http_agent = new HttpsProxyAgent(proxy)
    }
    if(headers.constructor === Object){
        header = headers
    }
    setTimeout(() => {
        controller.abort();
    }, timeout*1000);
    try{
        let res = ''
        if(method.toLowerCase() == 'get'){
            res = await fetch(url, {
                signal: controller.signal,
                method: method,
                agent: http_agent,
                headers: header,
            });
        }else if(method.toLowerCase() == 'post'){
            let parm = body
            if(parm.constructor === Object){
                parm = JSON.stringify(parm)
            }
            res = await fetch(url, {
                signal: controller.signal,
                method: method,
                agent: http_agent,
                headers: header,
                body: parm
            });
        }
        if(res.status == 200){
            if(type.toLowerCase() == 'html'){
                return await res.text();
            }else{
                return await res.json();
            }
        }
    }catch(e){
        return e
    }
}
module.exports = {
    fetch_url: get_html
}