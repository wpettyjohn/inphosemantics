#!/usr/bin/python

def serve(port):
    import SimpleHTTPServer
    import SocketServer
    
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    
    httpd = SocketServer.TCPServer(("", port), Handler)
    
    print "To view the inphosemantics interface, browse to http://localhost:" + str(port)
    httpd.serve_forever()

if __name__ == "__main__":
    import sys
    serve(int(sys.argv[1]))

