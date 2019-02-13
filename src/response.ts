import { ServerResponse } from 'http'

export class Response extends ServerResponse {
  public status(code: number) {
    this.statusCode = code
    return this
  }

  public json(obj: object) {
    this.setHeader('Content-Type', 'application/json')

    let json
    try {
      json = JSON.stringify(obj)
    } catch (err) {
      this.statusCode = 500
      return this.end('Error')
    }

    return this.send(json)
  }

  public send(body: string | object = '') {
    if (typeof body === 'object') {
      this.json(body)
    } else {
      this.end(body)
    }
  }
}
