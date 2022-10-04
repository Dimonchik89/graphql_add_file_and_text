const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
const { finished } = require('stream/promises');
const path = require("path")
const fs = require("fs")

const users = [
    {id: 1, name: "Vova"},
    {id: 2, name: "Petya"},
    {id: 3, name: "Vitya"},
]

const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        getUsers: () => users
    },
  
    Mutation: {
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
        console.log(file);
        const stream = createReadStream();
        const pathName = path.join(__dirname, `../static/${filename}`)
        const out = fs.createWriteStream(pathName);
        stream.pipe(out);
        await finished(out);
  
        return { filename, mimetype, encoding };
      },
      addUser: (parent, {input}) => {
        const newUser = input;
        console.log(input);
        users.push(newUser)
        return newUser
      }
    },
  };

module.exports = resolvers