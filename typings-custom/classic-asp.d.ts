interface IRequest {
	(paramName: string): any;
	serverVariables(name: string): any;
}

interface IResponse {
	contentType: string;
	write(s: string);
}

declare var Request: IRequest;
declare var Response: IResponse;

interface IServer {
    createObject(id: string): any;
    createObject(id: 'Scripting.FileSystemObject'): FileSystemObject;
    mapPath(path: string): string;
}

declare var Server: IServer;

declare const enum StreamMode {
    ForReading = 1,
    ForWriting = 2,
    ForAppending = 8
}

declare const enum FileEncoding {
    ASCII = 0, // TristateFalse
    Unicode = -1, // TristateTrue
    Default = -2, // TristateUseDefault
}

interface FileSystemObject {
    openTextFile(name: string, mode?: StreamMode, create?: boolean, format?: FileEncoding)
}