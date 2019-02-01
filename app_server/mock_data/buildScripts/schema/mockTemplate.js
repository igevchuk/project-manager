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
                }
              },
              required: ["id", "name"]
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
              },
              required: ["id", "name"]
            }
          },
          subSection: {
            type: "array",
            minItems: 6,
            maxItems: 6,
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
              },
              required: ["id", "name"]
            }
          },
          clause: {
            type: "array",
            minItems: 8,
            maxItems: 8,
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
              },
              required: ["id", "name"]
            }
          },
          subClause: {
            type: "array",
            minItems: 10,
            maxItems: 10,
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
              },
              required: ["id", "name"]
            }
          },
          textSegment: {
            type: "array",
            minItems: 14,
            maxItems: 14,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                isStart: {
                  type: "boolean",
                  faker: "random.boolean"
                },
                segment: {
                  type: "string",
                  faker: "name.name",
                  minLength: 200,
                  maxLength: 400
                },
                ref: {
                  articleId: {
                    $ref: "#/definitions/positiveInt"
                  },
                  sectionId: {
                    $ref: "#/definitions/positiveInt"
                  },
                  subSectionId: {
                    $ref: "#/definitions/positiveInt"
                  },
                  clauseId: {
                    $ref: "#/definitions/positiveInt"
                  },
                  subClauseId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },
                decorator: {
                  bold: {
                    type: "boolean",
                    faker: "random.boolean"
                  },
                  italic: {
                    type: "boolean",
                    faker: "random.boolean"
                  }
                }
              },
              required: ["id", "isStart", "segment", "ref", "decorator"]
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
      minimum: 1000,
      maximum: 9999,
      multipleOf: 7,
      exclusiveMinimum: true
    }
  }
};

module.exports = schema;
