import { createLogger, type Logger } from '@repo/shared'

export const logger: Logger = createLogger({
    level: 'info',
    filePath: './logs/combine.log',
    environment: 'development',
})
