import * as http from 'http'
import { ApplicationOptions } from './interfaces/application-options.interface'
import { Router } from './router'

export class Application {
  public server: http.Server
  private _router: Router = new Router()

  constructor(opts: ApplicationOptions) {
    this.server = http.createServer()
    this.initListeners()
  }

  private initListeners(): void {
    this.server.addListener('request', this.onRequest)
  }

  private onRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    this._router.handleRequest(req, res)
  }

  public close(callback: (err: Error) => void): void {
    this.server.close(callback)
  }

  public listen(port: number, callback: (err: Error) => void): void {
    this.server.listen(port, callback)
  }
}
