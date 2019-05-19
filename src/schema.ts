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
    creators: [Creator!]
    comics: [Comic!]
    stories: [Story!]
    events: [Event!]
    series: [Series!]
  }

  type Event {
    id: String
    title: String
    description: String
    thumbnail: String
    start: String
    end: String
    url: [Url!]
    characters: [Character!]
    creators: [Creator!]
    comics: [Comic!]
    stories: [Story!]
    series: [Series!]
  }

  type Comic {
    id: String
    title: String
    issueNumber: Int
    description: String
    isbn: String
    format: String
    pageCount: String
    textObjects: [TextObject!]
    images: [Image!]
    thumbnail: Image
    creators: [Creator!]
    characters: [Character!]
    stories: [Story!]
    events: [Event!]
    series: [Series!]
  }

  type Creator {
    id: String
    firstName: String
    middleName: String
    lastName: String
    suffix: String
    fullName: String
    thumbnail: Image
    comics: [Comic!]
    characters: [Character!]
    stories: [Story!]
    events: [Event!]
    series: [Series!]
  }

  type Series {
    id: String
    title: String
    description: String
    startYear: Int
    endYear: Int
    rating: String
    thumbnail: Image
    comics: [Comic!]
    characters: [Character!]
    stories: [Story!]
    events: [Event!]
    creators: [Creator!]
  }

  type Story {
    id: String
    title: String
    description: String
    type: String
    thumbnail: Image
    comics: [Comic!]
    characters: [Character!]
    series: [Series!]
    events: [Event!]
    creators: [Creator!]
  }

  type TextObject {
    type: String
    language: String
    text: String
  }

  type Image {
    path: String
    extension: String
  }

  type Url {
    type: String
    url: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getCharacterById(characterId: Int): Character
    getEventById(eventId: Int): Event
    findCharacters(limit: Int, nameStartsWith: String, offset: Int, orderBy: String): [Character!]!
  }
`;

export default schema;
