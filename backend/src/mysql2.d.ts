declare module 'mysql2/promise' {
    export function createConnection({
        host,
        port,
        user,
        password,
    }: {
        host: string;
        port: number;
        user: string;
        password: string;
    }): any;
}
