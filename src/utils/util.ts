const populateCreator = (creator: any): any => {
  const [creatorDTO] = creator;
  return {
    id: creatorDTO.id,
    firstName: creatorDTO.firstName,
    lastName: creatorDTO.lastName,
    fullName: creatorDTO.fullName,
    middleName: creatorDTO.middleName,
    thumbnail: `${creatorDTO.thumbnail.path}.${creatorDTO.thumbnail.extension}`,
  };
};

const populateCharacter = (characters: any): any => {
  const [characterDTO] = characters;
  return {
    id: characterDTO.id,
    name: characterDTO.name,
    description: characterDTO.description,
    thumbnail: `${characterDTO.thumbnail.path}.${characterDTO.thumbnail.extension}`,
    resourceURI: characterDTO.resourceURI,
  };
};

const populateEntity = (events: any): any => {
  const [eventDTO] = events;
  const {
    id,
    title,
    type,
    startYear,
    endYear,
    rating,
    description,
    issueNumber,
    isbn,
    format,
    pageCount,
    thumbnail: { path, extension },
  } = eventDTO;
  return {
    id,
    ...(title && { title }),
    ...(description && { description }),
    ...(type && { type }),
    ...(startYear && { startYear }),
    ...(endYear && { endYear }),
    ...(issueNumber && { issueNumber }),
    ...(isbn && { isbn }),
    ...(format && { format }),
    ...(pageCount && { pageCount }),
    ...(rating && { rating }),
    thumbnail: `${path}.${extension}`,
    ...(path && extension ? { thumbnail: `${path}.${extension}` } : {}),
  };
};

export const fillEntities: { [name: string]: (_: any) => any } = {
  creators: populateCreator,
  characters: populateCharacter,
  events: populateEntity,
  stories: populateEntity,
  series: populateEntity,
  comics: populateEntity,
};
