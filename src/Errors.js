class EnginnError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class FetchError extends EnginnError { }
class HTTPError extends EnginnError { }
class ClientError extends HTTPError { }
class ServerError extends HTTPError { }
class BadRequestError extends ClientError { }
class UnauthorizedError extends ClientError { }
class ForbiddenError extends ClientError { }
class ResourceNotFound extends ClientError { }
class ProxyAuthError extends ClientError { }
class ConflictError extends ClientError { }
class UnprocessableEntityError extends ClientError { }
class NilStatusError extends ServerError { }

const fetchResponseError = (response) => {
  switch (response.status) {
    case 400:
      return new BadRequestError(response.statusText);
    case 401:
      return new UnauthorizedError(response.statusText);
    case 403:
      return new ForbiddenError(response.statusText);
    case 404:
      return new ResourceNotFound(response.statusText);
    case 407:
      return new ProxyAuthError(response.statusText);
    case 409:
      return new ConflictError(response.statusText);
    case 422:
      return new UnprocessableEntityError(response.statusText);
  }
  if(response.status > 400 & response.status < 500) {
    return new ClientError(response.statusText);
  }
  if(response.status > 500 & response.status < 600) {
    return new ServerError(response.statusText);
  }
  return new NilStatusError(response.statusText);
}

export default {
  EnginnError,
  FetchError,
  HTTPError,
  ClientError,
  ServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ResourceNotFound,
  ProxyAuthError,
  ConflictError,
  UnprocessableEntityError,
  NilStatusError,
  fetchResponseError
}
