import { IncomingMessage, ServerResponse } from 'http'
import { Methods } from '../enums/methods.enum'

export interface Route {
  readonly method: Methods
  readonly path: string
  readonly callback: (req: IncomingMessage, res: ServerResponse) => void
}
