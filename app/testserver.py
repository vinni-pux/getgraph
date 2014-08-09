#!/usr/bin/env python
# -*-coding: UTF-8 -*-


import  BaseHTTPServer, json, time, threading, pprint
from urlparse import urlparse, parse_qs




class ReqHandler( BaseHTTPServer.BaseHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        BaseHTTPServer.BaseHTTPRequestHandler.__init__( self, request, client_address, server )
    
    def __del__(self):
        pass

    def do_GET(self ):
        global INDEX_1,INDEX_2
        self.log_message("do_GET "+self.path)
        if self.path == '/':
            self.path = '/index.html'
        self.performReq(self.path)    

    def do_POST(self):
        if self.path == '/datalog':
            length = int(self.headers['Content-Length'])
            decData = str(self.rfile.read(length).decode('utf-8'))
            postData = json.loads(decData)
            #delEntry(postData, dataFile)
            self.send_response(200,"Ok!")
            self.end_headers()



    def performReq (self, req ):
        global CB
        """ Performing http request """
        self.log_message('performReq '+req+' '+req[:4])
        if req[:4] == '/vie':
            self.send_response(200,"Ok!")
            self.send_header('Content', 'application/json; charset=UTF-8' )
            self.end_headers()
            fname = 'viewentry.html'
            f = open(fname)
            for l in f:
                self.wfile.write(l)
            f.close()
        else:
            fname  = self.path[1:]    
            try:
                self.send_response(200,"Ok!")
                self.send_header('Content', 'text/xml; charset=UTF-8' )
                self.end_headers()
                f = open(fname)
                for l in f:
                    self.wfile.write(l)    
                f.close()
                print 'file '+fname+" Ok"    
            except IOError:
                print 'no file '+fname    
                self.send_error(404)
            
    
if __name__=='__main__':
    server = BaseHTTPServer.HTTPServer( ('',8882), ReqHandler )
    print('server ok!')
    server.serve_forever()
    
    
    

