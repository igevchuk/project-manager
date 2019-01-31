let schema = {
  type: "object",
  properties: {
    templates: {
      type: "array",
      minItems: 4,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "#/definitions/positiveInt"
          },
          firstName: {
            type: "string",
            faker: "name.firstName",
            minLength: 100
          },
          lastName: {
            type: "string",
            faker: "name.lastName",
            minLength: 40
          },
          email: {
            type: "string",
            format: "email",
            faker: "internet.email"
          }
        },
        required: ["id", "firstName", "lastName", "email"]
      }
    }
  },
  required: ["templates"],
  definitions: {
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

module.exports = schema;
