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
          version: {
            type: "integer",
            minimum: 1,
            maximum: 9,
            unique: true
          },
          versionIsPublished: {
            type: "boolean",
            faker: "random.boolean"
          },
          lastSaved: {
            type: "string",
            faker: "name.name",
            minLength: 10,
            maxLength: 10
          },
          lastPublished: {
            type: "string",
            faker: "name.name",
            minLength: 10,
            maxLength: 10
          },
          editIsLocked: {
            type: "boolean",
            faker: "random.boolean"
          },
          editLockedBy: {
            type: "string",
            faker: "name.name",
            minLength: 10,
            maxLength: 10
          },
          contentOutline: {
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
                    blockId: {
                      $ref: "#/definitions/positiveInt"
                    },
                    sequence: {
                      type: "integer",
                      minimum: 1,
                      maximum: 99,
                      unique: true
                    }
                  },
                  required: ["id", "blockId", "sequence"]
                }
              },

              sections: {
                type: "array",
                minItems: 2,
                maxItems: 2,
                items: {
                  type: "object",
                  properties: {
                    id: {
                      $ref: "#/definitions/positiveInt"
                    },
                    blockId: {
                      $ref: "#/definitions/positiveInt"
                    },
                    sequence: {
                      type: "integer",
                      minimum: 1,
                      maximum: 99,
                      unique: true
                    },
                    ref: {
                      articleId: {
                        $ref: "#/definitions/positiveInt"
                      }
                    }
                  },
                  required: ["id", "blockId", "sequence", "ref"]
                }
              },

              subSections: {
                type: "array",
                minItems: 2,
                maxItems: 2,
                items: {
                  type: "object",
                  properties: {
                    id: {
                      $ref: "#/definitions/positiveInt"
                    },
                    blockId: {
                      $ref: "#/definitions/positiveInt"
                    },
                    sequence: {
                      type: "integer",
                      minimum: 1,
                      maximum: 99,
                      unique: true
                    },
                    ref: {
                      sectionId: {
                        $ref: "#/definitions/positiveInt"
                      }
                    }
                  },
                  required: ["id", "blockId", "sequence", "ref"]
                }
              },

              clauses: {
                type: "array",
                minItems: 2,
                maxItems: 2,
                items: {
                  type: "object",
                  properties: {
                    id: {
                      $ref: "#/definitions/positiveInt"
                    },
                    blockId: {
                      $ref: "#/definitions/positiveInt"
                    },
                    sequence: {
                      type: "integer",
                      minimum: 1,
                      maximum: 99,
                      unique: true
                    },
                    ref: {
                      subSectionId: {
                        $ref: "#/definitions/positiveInt"
                      }
                    }
                  },
                  required: ["id", "blockId", "sequence", "ref"]
                }
              },

              subClauses: {
                type: "array",
                minItems: 2,
                maxItems: 2,
                items: {
                  type: "object",
                  properties: {
                    id: {
                      $ref: "#/definitions/positiveInt"
                    },
                    blockId: {
                      $ref: "#/definitions/positiveInt"
                    },
                    sequence: {
                      type: "integer",
                      minimum: 1,
                      maximum: 99,
                      unique: true
                    },
                    ref: {
                      clauseId: {
                        $ref: "#/definitions/positiveInt"
                      }
                    }
                  },
                  required: ["id", "blockId", "sequence", "ref"]
                }
              }
            },
            required: [
              "id",
              "name",
              "articles",
              "sections",
              "subSections",
              "clauses",
              "subClauses"
            ]
          },

          blocks: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                isActive: {
                  type: "boolean",
                  faker: "random.boolean"
                },
                sequence: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                }
              },
              required: ["id", "isActive", "sequence"]
            }
          },

          paragraphs: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                type: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                ref: {
                  blockId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "type",
                "ref",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
            }
          },

          table: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                ref: {
                  blockId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },
                type: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },

                styling: {
                  type: "object",
                  properties: {
                    "w:tblStyle": {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    tblW: {
                      type: "boolean",
                      faker: "random.boolean"
                    }
                  },
                  required: ["w:tblStyle", "tblW"]
                },

                columns: {
                  type: "array",
                  minItems: 2,
                  maxItems: 2,
                  items: {
                    type: "object",
                    properties: {
                      revision: {
                        type: "integer",
                        minimum: 1,
                        maximum: 99,
                        unique: true
                      },
                      revision: {
                        type: "integer",
                        minimum: 1,
                        maximum: 99,
                        unique: true
                      }
                    },
                    required: ["revision", "revision"]
                  }
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "ref",
                "type",
                "styling",
                "columns",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
            }
          },

          tableRow: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                ref: {
                  tableId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },
                sequence: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                type: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                styling: {
                  type: "object",
                  properties: {
                    height: {
                      type: "boolean",
                      faker: "random.boolean"
                    }
                  },
                  required: ["height"]
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "type",
                "ref",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
            }
          },

          tableCell: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                ref: {
                  tableRowId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },
                sequence: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                type: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },

                styling: {
                  type: "object",
                  properties: {
                    width: {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    rowSpan: {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    colSpan: {
                      type: "boolean",
                      faker: "random.boolean"
                    }
                  },
                  required: ["width", "rowSpan", "colSpan"]
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "ref",
                "sequence",
                "type",
                "styling",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
            }
          },

          tableParagraph: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },

                ref: {
                  tableCellId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "ref",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
            }
          },

          textSegment: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                ref: {
                  paragraphId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },
                styling: {
                  type: "object",
                  properties: {
                    b: {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    i: {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    u: {
                      type: "boolean",
                      faker: "random.boolean"
                    }
                  },
                  required: ["b", "i", "u"]
                },

                sequence: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                // type: string,
                variantGroup: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                variantType: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                }, // Standard/Neutral
                variantIsDefault: { type: "boolean", faker: "random.boolean" },
                text: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },
                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "type",
                "ref",
                "styling",
                "sequence",
                "variantGroup",
                "variantType",
                "variantIsDefault",
                "text",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
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
          },

          run: {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
              type: "object",
              properties: {
                id: {
                  $ref: "#/definitions/positiveInt"
                },
                type: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                ref: {
                  blockId: {
                    $ref: "#/definitions/positiveInt"
                  }
                },
                sequence: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },

                styling: {
                  type: "object",
                  properties: {
                    b: {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    i: {
                      type: "boolean",
                      faker: "random.boolean"
                    },
                    u: {
                      type: "boolean",
                      faker: "random.boolean"
                    }
                  },
                  required: ["b", "i", "u"]
                },

                t: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },

                revision: {
                  type: "integer",
                  minimum: 1,
                  maximum: 99,
                  unique: true
                },

                revisionCreatedDateTime: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                },
                revisionCreatedBy: {
                  type: "string",
                  faker: "name.name",
                  minLength: 20
                } // 7006
              },

              required: [
                "id",
                "type",
                "ref",
                "sequence",
                "styling",
                "t",
                "revision",
                "revisionCreatedDateTime",
                "revisionCreatedBy"
              ]
            }
          },

          variable: {
            type: "object",
            properties: {
              id: {
                $ref: "#/definitions/positiveInt"
              },
              type: {
                type: "string",
                faker: "name.name",
                minLength: 20
              },

              placeholder: {
                type: "string",
                faker: "name.name",
                minLength: 20
              },
              description: {
                type: "string",
                faker: "name.name",
                minLength: 20
              },
              isGlobal: { type: "boolean", faker: "random.boolean" },
              variableGroupId: {
                type: "integer",
                minimum: 1,
                maximum: 99,
                unique: true
              },
              variableGroupName: {
                type: "string",
                faker: "name.name",
                minLength: 20
              },
              groupType: {
                type: "string",
                faker: "name.name",
                minLength: 20
              },
              revision: {
                type: "integer",
                minimum: 1,
                maximum: 99,
                unique: true
              },
              revisionCreatedDateTime: {
                type: "string",
                faker: "name.name",
                minLength: 20
              }, // Date
              revisionCreatedBy: {
                type: "string",
                faker: "name.name",
                minLength: 20
              }
            },

            required: [
              "id",
              "type",
              "placeholder",
              "description",
              "isGlobal",
              "variableGroupId",
              "variableGroupName",
              "groupType",
              "revision",
              "revisionCreatedDateTime",
              "revisionCreatedBy"
            ]
          },

          history: {
            type: "object",
            properties: {
              id: {
                $ref: "#/definitions/positiveInt"
              }
            },
            required: ["id"]
          }
        },
        required: [
          "id",
          "name",
          "version",
          "versionIsPublished",
          "lastSaved",
          "lastPublished",
          "editIsLocked",
          "editLockedBy",
          "contentOutline",
          "blocks",
          "paragraphs",
          "table",
          "tableRow",
          "tableCell",
          "tableParagraph",
          "textSegment",
          "textVariant",
          "run",
          "variable",
          "history"
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
