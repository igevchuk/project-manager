const schema = {
  type: "object",
  properties: {
    user: {
      type: "object",
      properties: {
        id: {
          $ref: "#/definitions/positiveInt"
        },
        name: {
          type: "string",
          faker: "name.findName"
          // minLength: 1000
        },
        email: {
          type: "string",
          format: "email",
          faker: "internet.email"
        }
      },
      required: ["id", "name", "email"]
    }
  },
  required: ["user"],
  definitions: {
    positiveInt: {
      type: "integer",
      minimum: 4,
      exclusiveMinimum: true
    }
  }
};

module.exports = schema;
