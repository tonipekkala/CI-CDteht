const http = require('http');
const qs = require('querystring');
const calculator = require('./calculator');
const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((request, response) => {
  console.dir(request.param);

  if (request.method == 'POST') {
    console.log('POST');
    let body = '';
    request.on('data', (data) => {
      body += data;
    });

    request.on('end', () => {
      const post = qs.parse(body);
      const numbers = post.numbers;
      const result = calculator.add(numbers);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end('Result: ' + result);
    });
  } else {
    const html = `
            <html>
                <body>
                    <form method="post" action="http://localhost:3000">Numbers: 
                        <input type="text" name="numbers" />
                        <input type="submit" value="Add" />
                    </form>
                </body>
            </html>`;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
  }
});

server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);