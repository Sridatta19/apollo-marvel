import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const schema: DocumentNode = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # enum {
  #   NAME
  #   MODIFIED
  #   -NAME
  #   -MODIFIED
  # }

  type Character {
    id: String
    name: String
    description: String
    thumbnail: String
    resourceURI: String
    events: [Event]!
  }

  type Event {
    id: String
    title: String
    description: String
    thumbnail: String
    characters: [Character]!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getCharacterById(characterId: Int): Character
    getEventById(eventId: Int): Event
    findCharacters(limit: Int, nameStartsWith: String, offset: Int, orderBy: String): [Character]!
  }
`;

export default schema;
