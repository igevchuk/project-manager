let schema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      minItems: 4,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            unique: true,
            minimum: 1
          },
          firstName: {
            type: 'string',
            faker: 'name.firstName',
            minimum: 1110
          },
          lastName: {
            type: 'string',
            faker: 'lastName'
          },
          email: {
            type: 'string',
            faker: 'email'
          }
        },
        required: ['id', 'type', 'firstName', 'lastname', 'email']
      }
    }
  },
  required: ['users']
};

module.exports = schema;
