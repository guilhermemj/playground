import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  setupHttpRequestMock,
  teardownHttpRequestMock,
  checkUsedUrl,
  checkUsedHttpMethod,
  stubRequestWith,
} from './utils';

import SpotifyWrapper from '../src/main';

chai.use(chaiAsPromised);
chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});

describe('Spotify Wrapper', () => {
  let wrapperInstance;

  beforeEach(() => {
    wrapperInstance = new SpotifyWrapper('foobar');

    setupHttpRequestMock(wrapperInstance.httpRequest);
    stubRequestWith({ foo: 'bar' });
  });

  afterEach(() => {
    teardownHttpRequestMock(wrapperInstance.httpRequest);
  });

  describe('Smoke Tests', () => {
    it('Should expose used "httpRequest" method', () => {
      expect(wrapperInstance.httpRequest).to.exist;
    });

    it('Should define a "search" method', () => {
      expect(wrapperInstance.search).to.exist;
    });

    it('Should define a "searchAlbums" method', () => {
      expect(wrapperInstance.searchAlbums).to.exist;
    });

    it('Should define a "searchArtists" method', () => {
      expect(wrapperInstance.searchArtists).to.exist;
    });

    it('Should define a "searchPlaylists" method', () => {
      expect(wrapperInstance.searchPlaylists).to.exist;
    });

    it('Should define a "searchTracks" method', () => {
      expect(wrapperInstance.searchTracks).to.exist;
    });
  });

  describe('General Search', () => {
    it('Should accept one or many search types', () => Promise.all([
      expect(wrapperInstance.search('Foo', 'album')).to.be.fulfilled,
      expect(wrapperInstance.search('Foo', 'artist')).to.be.fulfilled,
      expect(wrapperInstance.search('Foo', ['album', 'artist'])).to.be.fulfilled,
    ]));

    it('Should only accept valid search types', () => Promise.all([
      expect(wrapperInstance.search('Foo', 'album')).to.be.fulfilled,
      expect(wrapperInstance.search('Foo', 'bar')).to.be.rejected,
      expect(wrapperInstance.search('Foo', ['album', 'bar'])).to.be.rejected,
    ]));

    it('Should make a corresponding HTTP request', () => Promise.all([
      expect(checkUsedHttpMethod(() => wrapperInstance.search('Foo', 'artist')))
        .to.eventually.equal('get'),

      expect(checkUsedUrl(() => wrapperInstance.search('Foo', 'artist')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Foo&type=artist'),

      expect(checkUsedUrl(() => wrapperInstance.search('Bar', 'album')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Bar&type=album'),

      expect(checkUsedUrl(() => wrapperInstance.search('FooBar', ['artist', 'album'])))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=FooBar&type=artist,album'),
    ]));
  });

  describe('Search Albums', () => {
    it('Should make a corresponding HTTP request', () => Promise.all([
      expect(checkUsedHttpMethod(() => wrapperInstance.searchAlbums('Foo')))
        .to.eventually.equal('get'),

      expect(checkUsedUrl(() => wrapperInstance.searchAlbums('Foo')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Foo&type=album'),

      expect(checkUsedUrl(() => wrapperInstance.searchAlbums('Bar')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Bar&type=album'),
    ]));
  });

  describe('Search Artists', () => {
    it('Should make a corresponding HTTP request', () => Promise.all([
      expect(checkUsedHttpMethod(() => wrapperInstance.searchArtists('Foo')))
        .to.eventually.equal('get'),

      expect(checkUsedUrl(() => wrapperInstance.searchArtists('Foo')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Foo&type=artist'),

      expect(checkUsedUrl(() => wrapperInstance.searchArtists('Bar')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Bar&type=artist'),
    ]));
  });

  describe('Search Playlists', () => {
    it('Should make a corresponding HTTP request', () => Promise.all([
      expect(checkUsedHttpMethod(() => wrapperInstance.searchPlaylists('Foo')))
        .to.eventually.equal('get'),

      expect(checkUsedUrl(() => wrapperInstance.searchPlaylists('Foo')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Foo&type=playlist'),

      expect(checkUsedUrl(() => wrapperInstance.searchPlaylists('Bar')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Bar&type=playlist'),
    ]));
  });

  describe('Search Tracks', () => {
    it('Should make a corresponding HTTP request', () => Promise.all([
      expect(checkUsedHttpMethod(() => wrapperInstance.searchTracks('Foo')))
        .to.eventually.equal('get'),

      expect(checkUsedUrl(() => wrapperInstance.searchTracks('Foo')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Foo&type=track'),

      expect(checkUsedUrl(() => wrapperInstance.searchTracks('Bar')))
        .to.eventually.equal('https://api.spotify.com/v1/search?q=Bar&type=track'),
    ]));
  });
});
