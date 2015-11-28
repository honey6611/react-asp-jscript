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