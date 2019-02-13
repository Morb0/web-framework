import * as http from 'http'
import { ApplicationOptions } from './interfaces/application-options.interface'
import { Router } from './router'

export class Application {
  public server: http.Server
  private _routers: Router[] = []

  constructor(opts: ApplicationOptions) {
    this.server = http.createServer()
    this.initListeners()
  }

  private initListeners(): void {
    this.server.addListener('request', (req, res) => this.onRequest(req, res))
  }

  private onRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    this._routers.forEach(router => router.handleRequest(req, res))
  }

  public use(router: Router): void {
    this._routers.push(router)
  }

  public close(callback: (err: Error) => void): void {
    this.server.close(callback)
  }

  public listen(port: number, callback: (err: Error) => void): void {
    this.server.listen(port, callback)
  }
}
