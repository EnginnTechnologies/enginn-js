class EnginnError extends Error {
  constructor(response) {
    super(response.statusText);
    this.name = this.constructor.name;
    this.response = response;
  }

  async details() {
    const body = this.response.json()
    return body.errors
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
      return new BadRequestError(response);
    case 401:
      return new UnauthorizedError(response);
    case 403:
      return new ForbiddenError(response);
    case 404:
      return new ResourceNotFound(response);
    case 407:
      return new ProxyAuthError(response);
    case 409:
      return new ConflictError(response);
    case 422:
      return new UnprocessableEntityError(response);
  }
  if(response.status > 400 & response.status < 500) {
    return new ClientError(response);
  }
  if(response.status > 500 & response.status < 600) {
    return new ServerError(response);
  }
  return new NilStatusError(response);
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
