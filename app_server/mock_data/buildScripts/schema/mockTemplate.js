let schema = {
  type: "object",
  properties: {
    templates: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "#/definitions/positiveInt"
          },
          name: {
            type: "string",
            faker: "name.name",
            minLength: 20
          },
          textLevel: {
            type: "string",
            faker: "name.textLevel",
            minLength: 15
          },
          article: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }
              }
            }
          },
          section: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }
              }
            }
          },
          subSection: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }
              }
            }
          },
          clause: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }
              }
            }
          },
          subClause: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }
              }
            }
          },
          textSegment: {
            type: "array",
            minItems: 4,
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }
              }
            }
          }
        },
        required: [
          "id",
          "name",
          "textLevel",
          "article",
          "section",
          "subSection",
          "clause",
          "subClause",
          "textSegment"
        ]
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
