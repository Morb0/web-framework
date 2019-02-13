import { IncomingMessage, ServerResponse } from 'http'
import { parse as parseUrl } from 'url'
import { Route } from './interfaces/route.interface'
import { Methods } from './enums/methods.enum'

export class Router {
  private routes: Route[] = []

  public handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const path = parseUrl(req.url || '/').pathname

    // Find router
    const foundRouter = this.routes.find(route => route.path === path)
  }

  public use(
    path: string,
    method: Methods,
    callback: (req: IncomingMessage, res: ServerResponse) => void
  ): void {
    this.routes.push({
      method,
      path,
      callback
    })
  }

  public get(path: string, callback: (req: IncomingMessage, res: ServerResponse) => void): void {
    this.use(path, Methods.GET, callback)
  }
}
