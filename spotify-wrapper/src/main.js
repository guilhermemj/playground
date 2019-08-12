import axios from 'axios';

export default class SpotifyWrapper {
  constructor(authToken) {
    this.httpRequest = axios.create({
      baseURL: 'https://api.spotify.com/v1/',

      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  search(query, searchType) {
    const ALLOWED_TYPES = [
      'album',
      'artist',
      'playlist',
      'track',
    ];

    const types = Array.isArray(searchType) ? searchType : [searchType];

    const forbiddenType = types.find((type) => !ALLOWED_TYPES.includes(type));

    if (forbiddenType) {
      return Promise.reject(
        new Error(`Search type "${forbiddenType}" is not allowed`),
      );
    }

    return this.httpRequest({
      method: 'get',
      url: '/search',
      params: {
        q: query,
        type: types.join(','),
      },
    });
  }

  searchAlbums(query) {
    return this.search(query, 'album');
  }

  searchArtists(query) {
    return this.search(query, 'artist');
  }

  searchPlaylists(query) {
    return this.search(query, 'playlist');
  }

  searchTracks(query) {
    return this.search(query, 'track');
  }
}
