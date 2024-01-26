export interface IDBConnection{
    authenticate(): Promise<void>
    executeQuery(query: string, parameters?: any[]): Promise<any>
    close(): Promise<void>
}