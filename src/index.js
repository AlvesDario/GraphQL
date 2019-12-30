const { GraphQLServer } = require('graphql-yoga');
const axios = require('axios');
const JSONSTORE = "https://www.jsonstore.io/4149694f069a5c31f93c324a4ed1f595102dd639f1ed783d35e7bf24b33d79a2/links/";
let IdCount;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async () => {
        return (await axios.default.get(JSONSTORE)).data.result;
    }
  },
  Mutation: {
    post: async (parent, args) => {
      IdCount = await (await axios.default.get(JSONSTORE)).data.result.length;
      const link = {
        id: `link-${IdCount++}`,
        description: args.description,
        url: args.url
      }
      axios.default.post(JSONSTORE + (IdCount-1), link);
      return link
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))