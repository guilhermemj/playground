// Functions involving external libs are grouped in order to
// ease refactoring and keep test files implementation-agnostic
import moxios from 'moxios';

export const setupHttpRequestMock = (httpRequestMethod) => {
  moxios.install(httpRequestMethod);
};

export const teardownHttpRequestMock = (httpRequestMethod) => {
  moxios.uninstall(httpRequestMethod);
};

export const stubRequestWith = (response = {}, url = /.*/) => {
  moxios.stubRequest(url, {
    status: 200,
    response,
  });
};

export const checkUsedUrl = async (testFn) => {
  const { request } = await testFn();

  return request.url;
};

export const checkUsedHttpMethod = async (testFn) => {
  const { request } = await testFn();

  return request.config.method;
};
