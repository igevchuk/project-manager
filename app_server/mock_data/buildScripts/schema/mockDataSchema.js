let schema1 = {
  type: "object",
  properties: {
    users: {
      type: "array",
      minItems: 14,
      maxItems: 20,
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "#/definitions/positiveInt"
          },
          firstName: {
            type: "string",
            faker: "name.firstName",
            minLength: 1000
          },
          lastName: {
            type: "string",
            faker: "name.lastName"
          },
          email: {
            type: "string",
            format: "email",
            faker: "internet.email"
          }
        },
        required: ["id", "firstName", "lastname", "email"]
      }
    }
  },
  required: ["users"]
};

let schema0 = {
  type: "object",
  properties: {
    users: {
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
  required: ["users"]
};

module.exports = schema0;
