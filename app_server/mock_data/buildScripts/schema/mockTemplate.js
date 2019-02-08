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
          selectedType: {
            $ref: "#/definitions/positiveInt"
          },
          type: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                model: {
                  type: "string",
                  faker: "name.name",
                  minLength: 10
                }
              }
            }
          },
          paragraphLevel: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                name: {
                  type: "string",
                  faker: "name.name",
                  minLength: 10
                }
              }
            }
          },
          articles: {
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
          sections: {
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
          subSections: {
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
          clauses: {
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
          subClauses: {
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
          textSegments: {
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
          },
          textVariant: {
            type: "array",
            minItems: 14,
            maxItems: 14,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                title: {
                  type: "string",
                  faker: "lorem.word"
                },
                text: {
                  type: "string",
                  faker: "lorem.sentence",
                  minLength: 200,
                  maxLength: 400
                },
                sequence: {
                  type: "integer",
                  minimum: 1,
                  maximum: 9999,
                  unique: true
                },
                ref: {
                  segmentId: {
                    $ref: "#/definitions/positiveInt"
                  }
                }
              },
              required: ["id", "title", "text", "sequence", "segmentId"]
            }
          }
        },
        required: [
          "id",
          "name",
          "selectedType",
          "textLevel",
          "article",
          "section",
          "subSection",
          "clause",
          "subClause",
          "textSegment",
          "textVariant"
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
