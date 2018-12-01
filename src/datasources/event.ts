import BaseAPI from './base';

export default class EventsAPI extends BaseAPI {
  populateEvent = (events: Array<{ [key: string]: any }>): any => {
    const [eventDTO] = events;
    const {
      id,
      title,
      description,
      thumbnail: { path, extension },
      resourceURI,
      characters,
    } = eventDTO;
    return {
      id,
      ...(title && { title }),
      ...(description && { description }),
      thumbnail: `${path}.${extension}`,
      ...(path && extension ? { thumbnail: `${path}.${extension}` } : {}),
      resourceURI,
      characters:
        characters.items &&
        characters.items.map((character: any) => ({
          id: character.resourceURI.substring(character.resourceURI.lastIndexOf('/') + 1),
          name: character.name,
        })),
    };
  };

  getEvent = async (eventId: number): Promise<any> => {
    const res = await this.getJSON(`events/${eventId}`);
    const {
      data: {
        data: { results },
      },
    } = res;
    return this.populateEvent(results);
  };
}
