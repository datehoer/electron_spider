const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const HttpsProxyAgent = require('https-proxy-agent');

async function main(){
    let res = await fetch('http://www.baidu.com', {
        method: 'get',
        agent: new HttpsProxyAgent('http://127.0.0.1:7890'),
    });
    console.log(await res.text())
}
main()