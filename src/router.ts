import { IncomingMessage, ServerResponse } from 'http'
import { parse as parseUrl } from 'url'
import { Route } from './interfaces/route.interface'
import { Methods } from './enums/methods.enum'

export class Router {
  private routes: Route[] = []

  constructor(private readonly prefix?: string) {}

  public handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const path = (this.prefix || '') + parseUrl(req.url || '/').pathname

    // Find router
    const foundRoute = this.routes.find(route => route.path === path)

    if (!foundRoute) {
      res.statusCode = 404
      return res.end('Page not found')
    }

    foundRoute.callback(req, res)
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
