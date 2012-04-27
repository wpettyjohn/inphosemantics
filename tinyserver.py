#!/usr/bin/python

import BaseHTTPServer
import SimpleHTTPServer
import time
import json
import random

class TestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    """The test example handler."""

    def do_POST(self):
        """Handle a post request by returning the square of the number."""

        length = int(self.headers.getheader('content-length'))

        data_string = self.rfile.read(length)

        # Assumes the incoming request is a stringified json Object.
        # The keys are "corpus", "model", "phrase"
        print data_string
        params = json.loads(data_string)
        corpus = params['corpus'].split('.')[0]
        corpus_param = params['corpus'].split('.')[1]
        model = params['model'].split('.')[0]
        model_param = params['model'].split('.')[1]
        query = params['phrase']
        n = 20

        term = corpus[0] + corpus_param[0] + model[0] + model_param[0] + '-' + query
        
        result = [{ term: ((1.0 / len(term)) - (i * .01)) } for i in xrange(n)]

        server_lag = random.randint(1,5)
        print 'Simulated server lag:', server_lag
        time.sleep(server_lag)
        print 'Result', result

        json.dump(result, self.wfile)


def start_server():
    """Start the server."""
    server_address = ("", 8080)
    server = BaseHTTPServer.HTTPServer(server_address, TestHandler)
    server.serve_forever()

if __name__ == "__main__":
    start_server()
