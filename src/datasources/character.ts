import BaseAPI from './base';

export default class CharacterAPI extends BaseAPI {
  // willSendRequest(request: RequestOptions) {
  //   request.params.set('ts', ts.toString());
  //   request.params.set('apiKey', process.env.API_KEY as string);
  //   request.params.set('hash', );
  // }

  populateCharacter = (characters: any): any => {
    const [characterDTO] = characters;
    return {
      id: characterDTO.id,
      name: characterDTO.name,
      description: characterDTO.description,
      thumbnail: `${characterDTO.thumbnail.path}.${characterDTO.thumbnail.extension}`,
      resourceURI: characterDTO.resourceURI,
      events: characterDTO.events.items.map((event: any) => ({
        id: event.resourceURI.substring((event.resourceURI as string).lastIndexOf('/') + 1),
        title: event.name,
      })),
    };
  };

  async getCharacter(characterId: number): Promise<any> {
    const res = await this.getJSON(`characters/${characterId}`);
    const {
      data: {
        data: { results: characterResponse },
      },
    } = res;
    return this.populateCharacter(characterResponse);
  }

  async getCharacters(nameStartsWith: string, limit: number = 10): Promise<any> {
    const res = await this.getJSON(`characters`, {
      nameStartsWith,
      limit,
    });
    const {
      data: {
        data: { results: characters },
      },
    } = res;
    return characters.map((character: any) => this.populateCharacter([character]));
  }
}
