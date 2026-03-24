const http = require('http')
const fs = require('fs')

// another way to create server
// const myServer = http.createServer();

// myServer.on('request',(req,res)=>{
//     console.log("new request recieved");
//     res.end("hello world");
// })


const myServer = http.createServer((req,res)=>{

//     switch(req.url){
//         case '/home':
//             res.end("this is home page");
//             break;
//         case '/about':
//             res.end("this is about page");
//             break;
//         case '/contact':
//             res.end("this is contact page");
//             break;
//         default:
//             res.end("this is default page");
//     }

//    const log = `\n ${Date.now()} : ${req.url} \n`;
//     fs.appendFileSync('./test.txt',log);
    if(req.url === '/'){
        
        res.setHeader('content-type','text/html');
        res.write('<html>');
    res.write('<head> <h1> Input Form </h1></head>');
    res.write('<body>');
    res.write('<form action="/user-details" method="POST">');
    res.write('<label for="username">Username</label>');
    res.write('<input type="text" name="username"><br>');
    res.write('<input type="radio" name="gender" value="male">');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" name="gender" value="female">');
    res.write('<label for="female">Female</label><br>');
    res.write('<button type="submit">Send</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}
    if(req.url === '/user-details' && req.method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const bodyObject = Object.fromEntries(new URLSearchParams(parsedBody));
            console.log(bodyObject);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
    }
});

myServer.listen(8000, () => {
    console.log('server is running on port 8000');
}) 
