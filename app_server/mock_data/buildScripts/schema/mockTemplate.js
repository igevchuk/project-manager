let schema = {
  type: "object",
  properties: {
    template: {
      type: "array",
      minItems: 4,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
            unique: true,
            minimum: 1
          },
          firstName: {
            type: "string",
            faker: "name.firstName",
            minLength: 1000
          },
          lastName: {
            type: "string",
            faker: "lastName"
          },
          email: {
            type: "string",
            faker: "email"
          }
        },
        required: ["id", "type", "firstName", "lastname", "email"]
      }
    }
  },
  required: ["template"]
};

module.exports = schema;
