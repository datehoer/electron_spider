const {fetch_url} = require('./utils/fetch_url');

async function main(){
    let res = await fetch_url('http://www.baidu.com');
    console.log(res)
}
main()