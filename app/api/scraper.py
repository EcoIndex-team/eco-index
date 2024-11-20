from http.server import BaseHTTPRequestHandler
 
class handler(BaseHTTPRequestHandler):
 
    def do_GET(self):
        self.send_response(201)
        self.send_header('Content-type','text/plain')
        self.send_header('Access-Control-Allow-Origin','http://localhost:3000/result/')
        self.end_headers()
        self.wfile.write('test1'.encode('utf-8'))
        self.finish()
        return 'test2'