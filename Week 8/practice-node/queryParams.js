const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true);
    console.log(parsedUrl);
    switch(parsedUrl.pathname){
        case '/home':
            res.end('this is home page');
            break;
        case '/about':
            const username = parsedUrl.query?.name;
            if(username) res.end(`hello ${username} this is about page`);
            else res.end('this is about page');
            break;
        case '/contact':
            res.end('this is contact page');
            break;
        default:
            res.end('this is default page');
    }
})

server.listen(3000, ()=>{
    console.log('server running on the port 3000');
})