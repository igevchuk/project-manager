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
                },
                ref: {
                  templateId: {
                    $ref: "#/definitions/positiveInt"
                  }
                }
              },
              required: ["id", "name", "ref"]
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
                },
                ref: {
                  articleId: {
                    $ref: "#/definitions/positiveInt"
                  }
                }
              },
              required: ["id", "name", "ref"]
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
                },
                ref: {
                  sectionId: {
                    $ref: "#/definitions/positiveInt"
                  }
                }
              },
              required: ["id", "name", "ref"]
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
                },
                ref: {
                  subSectionId: {
                    $ref: "#/definitions/positiveInt"
                  }
                }
              },
              required: ["id", "name", "ref"]
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
                },
                ref: {
                  clauseId: {
                    $ref: "#/definitions/positiveInt"
                  }
                }
              },
              required: ["id", "name", "ref"]
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
