#!/usr/bin/python

import BaseHTTPServer
import SimpleHTTPServer
import json
import time

class TestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    # the test eample handler    

    def do_POST(self):
        # handle a post request by returning the number to some power
        content_length = int(self.headers.getheaders('content-length')[0])
        print 'Content Length:', content_length
        json_string = self.rfile.read(content_length)
        print 'JSON String:', json_string
        json_obj = json.loads(json_string)
        print 'JSON Obj:', json_obj
        """
        base_string = data_string[0]
        exponent_string = data_string[2]
        print 'Base String:', base_string
        print 'Exponent String:', exponent_string
        try:
            result = int(base_string) ** int(exponent_string)
            # time.sleep(2)
        except:
            result = 'error'
        print 'Result:', result
        self.wfile.write(result)
        """

def start_server():
    # start the server
    server_address = ("", 8080)
    server = BaseHTTPServer.HTTPServer(server_address, TestHandler)
    server.serve_forever()

if __name__ == "__main__":
    start_server()
