import * as http from 'http'
import { ApplicationOptions } from './interfaces/application-options.interface'
import { Router } from './router'

const debug = require('debug')('application')

export class Application {
  public server: http.Server
  private _routers: Router[] = []

  constructor(opts: ApplicationOptions) {
    debug('create server instance')
    this.server = http.createServer()
    this.initListeners()
  }

  private initListeners(): void {
    debug('init event listeners')
    this.server.addListener('request', (req, res) => this.onRequest(req, res))
  }

  private onRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    debug('new request')
    this._routers.forEach(router => router.handleRequest(req, res))
  }

  public use(router: Router): void {
    debug('add new router')
    this._routers.push(router)
  }

  public close(callback: (err: Error) => void): void {
    debug('close')
    this.server.close(callback)
  }

  public listen(port: number, callback: (err: Error) => void): void {
    debug('listen on %s port', port)
    this.server.listen(port, callback)
  }
}
