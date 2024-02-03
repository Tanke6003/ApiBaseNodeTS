export interface ISQLConnection{
    authenticate(): Promise<void>
    executeQuery(query: string, parameters?: any[]): Promise<any>
    close(): Promise<void>
}