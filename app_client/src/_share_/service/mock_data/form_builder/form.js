module.exports = function() {
  const data = [
    {
      id: '1',
      name: 'form 1',
      lastEdited: '2018-08-09 13:11',
      lastEditedBy: 'Abrar Huq',
      created: '2018-08-09 13:11',
      status: 'Draft',
      activePageId: '11',
      pages: [
        {
          id: '11',
          title: 'General',
          isInitial: 'false',
          hasPublished: 'false',
          activeSurveyId: '-1',
          surveys: [
            {
              id: '111',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 111',
              questionType: 'text',
              isRequired: 'false',
              questionTypeText: {
                multiLine: 'false',
                numberLine: '',
                default: {
                  value: '',
                  plaseholder: 'Pre-filled default response'
                },
                plaseholder: {
                  value: '',
                  plaseholder:
                    'Text that appears in the field until the user starts typing'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              questionTypeDatetime: {
                dateFormat: '',
                timeFormat: '',
                default: {
                  value: '',
                  plaseholder: 'Pre-filled default response'
                },
                plaseholder: {
                  value: '',
                  plaseholder:
                    'Text that appears in the field until the user starts typing'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              questionTypeSelect: {
                dropdown: 'false',
                options: [
                  { isDefault: 'ture', title: 'Option1' },
                  { isDefault: 'false', title: 'Option2' },
                  { isDefault: 'false', title: 'Option3' },
                  { isDefault: 'false', title: 'Option4' }
                ],
                addOtherOption: {
                  option: 'true',
                  value: 'Other'
                },
                includeCommentField: {
                  option: 'true',
                  plaseholder: {
                    value: '',
                    plaseholder: 'Please enter a comment'
                  }
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              questionTypeCheckbox: {
                options: [
                  { isDefault: 'ture', title: 'Option1' },
                  { isDefault: 'false', title: 'Option2' },
                  { isDefault: 'false', title: 'Option3' },
                  { isDefault: 'false', title: 'Option4' }
                ],
                addOtherOption: {
                  option: 'true',
                  value: 'Other'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              generatedSurvey: `<form class="ui form"><div class=\"inline fields\"><label>Does the Respondent have an ongoing arrangement with a client?</label><div class=\"field\"><div class=\"ui radio checkbox\"><input class=\"hidden\" readonly=\"\" tabindex=\"0\" type=\"radio\" value=\"Yes\"<label>Yes</label></div></div><div class=\"field\"><div class=\"ui radio checkbox\"><input class=\"hidden\" readonly=\"\" tabindex=\"0\" type=\"radio\" value=\"No\"<label>No</label></div></div><div class=\"grouped fields\"><label>HTML radios</label><div class=\"field\"><label><input name=\"htmlRadios\" type=\"radio\">Yes</label></div><div class=\"field\"><label><input name=\"htmlRadios\" type=\"radio\">No</label></div></div></form>`
            },
            {
              id: '112',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 112',
              questionType: 'text',
              isRequired: 'true',
              questionTypeText: {
                multiLine: 'false',
                numberLine: '',
                default: {
                  value: '',
                  plaseholder: 'Pre-filled default response'
                },
                plaseholder: {
                  value: '',
                  plaseholder:
                    'Text that appears in the field until the user starts typing'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              questionTypeDatetime: {
                dateFormat: '',
                timeFormat: '',
                default: {
                  value: '',
                  plaseholder: 'Pre-filled default response'
                },
                plaseholder: {
                  value: '',
                  plaseholder:
                    'Text that appears in the field until the user starts typing'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              questionTypeSelect: {
                dropdown: 'false',
                options: [
                  { isDefault: 'ture', title: 'Option1' },
                  { isDefault: 'false', title: 'Option2' },
                  { isDefault: 'false', title: 'Option3' },
                  { isDefault: 'false', title: 'Option4' }
                ],
                addOtherOption: {
                  option: 'true',
                  value: 'Other'
                },
                includeCommentField: {
                  option: 'true',
                  plaseholder: {
                    value: '',
                    plaseholder: 'Please enter a comment'
                  }
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              questionTypeCheckbox: {
                options: [
                  { isDefault: 'ture', title: 'Option1' },
                  { isDefault: 'false', title: 'Option2' },
                  { isDefault: 'false', title: 'Option3' },
                  { isDefault: 'false', title: 'Option4' }
                ],
                addOtherOption: {
                  option: 'true',
                  value: 'Other'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              generatedSurvey:
                '<div class="field"><label>Please enter the name of the Client entity</label><input placeholder="Enter the Client entity name"</div>'
            },
            {
              id: '113',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 113',
              questionType: 'select',
              isRequired: 'false',
              questionTypeSingle: {},
              generatedSurvey:
                '<div class="field"><div class="ui checkbox"><input class="hidden" readonly="" tabindex="0" type="checkbox" value=""><label>Please confirm and accept this intake form</label></div>'
            },
            {
              id: '114',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 114',
              questionType: 'checkbox',
              isRequired: 'false',
              questionTypeCheckbox: {},
              generatedSurvey: `<form class="ui form"><div class="field">
              <label>First Name</label><input placeholder="First Name"></div><div class="field"><label>Last Name</label>
              <input placeholder="Last Name"></div><div class="field"><div class="ui checkbox"><input class="hidden" readonly="" tabindex="0" type="checkbox" value="">
              <label>I agree to the Terms and Conditions</label></div></div><button type="submit" class="ui button" role="button">Submit</button></form>
              `
            },
            {
              id: '115',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 115',
              questionType: 'datetime',
              isRequired: 'false',
              questionTypeDatetime: {
                dateFormat: '',
                timeFormat: '',
                default: {
                  value: '',
                  plaseholder: 'Pre-filled default response'
                },
                plaseholder: {
                  value: '',
                  plaseholder:
                    'Text that appears in the field until the user starts typing'
                },
                description: {
                  value: '',
                  plaseholder: 'Help text that appears next to the field'
                }
              },
              generatedSurvey: `<form class="ui form"><div class="field">
              <label>First Name</label><input placeholder="First Name"></div><div class="field"><label>Last Name</label>
              <input placeholder="Last Name"></div><div class="field"><div class="ui checkbox"><input class="hidden" readonly="" tabindex="0" type="checkbox" value="">
              <label>I agree to the Terms and Conditions</label></div></div><button type="submit" class="ui button" role="button">Submit</button></form>
              `
            },
            {
              id: '116',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 116',
              questionType: 'heading',
              isRequired: 'false',
              questionTypeHeading: {},
              generatedSurvey: `<form class="ui form"><div class="field">
              <label>First Name</label><input placeholder="First Name"></div><div class="field"><label>Last Name</label>
              <input placeholder="Last Name"></div><div class="field"><div class="ui checkbox"><input class="hidden" readonly="" tabindex="0" type="checkbox" value="">
              <label>I agree to the Terms and Conditions</label></div></div><button type="submit" class="ui button" role="button">Submit</button></form>
              `
            },
            {
              id: '117',
              isDraft: 'true',
              onSettings: 'false',
              question: 'This is question 117',
              questionType: 'wrongtype',
              isRequired: 'false',
              questionTypeHeading: {},
              generatedSurvey: `<form class="ui form"><div class="field">
              <label>First Name</label><input placeholder="First Name"></div><div class="field"><label>Last Name</label>
              <input placeholder="Last Name"></div><div class="field"><div class="ui checkbox"><input class="hidden" readonly="" tabindex="0" type="checkbox" value="">
              <label>I agree to the Terms and Conditions</label></div></div><button type="submit" class="ui button" role="button">Submit</button></form>
              `
            }
          ]
        },
        {
          id: '12',
          title: 'Page_12',
          isInitial: 'true',
          hasPublished: 'false',
          activeSurveyId: '-1',
          surveys: []
        },
        {
          id: '13',
          title: 'Page_13',
          isInitial: 'true',
          hasPublished: 'false',
          activeSurveyId: '-1',
          surveys: []
        },
        {
          id: '14',
          title: 'Page_14',
          isInitial: 'true',
          hasPublished: 'false',
          activeSurveyId: '-1',
          surveys: []
        }
      ]
    },
    {
      id: '2',
      name: 'form 2',
      lastEdited: '2018-08-07 14:26',
      lastEditedBy: 'Abrar Huq',
      created: '2018-08-06 14:02',
      status: 'Draft',
      activePageId: '-1',
      pages: []
    },
    {
      id: '3',
      name: 'form 3',
      lastEdited: '2018-08-01 09:15',
      lastEditedBy: 'Abrar Huq',
      created: '2018-08-01 09:15',
      status: 'Published',
      activePageId: '-1',
      pages: []
    }
  ];

  return data;
};

// module.exports = function () {
//   const data = [
//     {
//       "id": "1",
//       "title": "General",
//       "isInitial": "false",
//       "hasPublished": "false",
//       "activeSurveyId": "11",
//       "surveys": [
//         {
//           "id": "10",
//           "question": "This is question 10",
//           "questionType": "text",
//           "questionTypeText": {

//           }
//         }, {
//           "id": "11",
//           "question": "This is question 11",
//           "questionType": "text",
//           "questionTypeText": {

//           }
//         }, {
//           "id": "12",
//           "question": "This is question 12",
//           "questionType": "single",
//           "questionTypeSingle": {

//           }
//         }, {
//           "id": "13",
//           "question": "This is question 13",
//           "questionType": "checkbox",
//           "questionTypeCheckbox": {

//           }
//         }, {
//           "id": "14",
//           "question": "This is question 14",
//           "questionType": "datetime",
//           "questionTypeDatetime": {

//           }
//         }, {
//           "id": "15",
//           "question": "This is question 15",
//           "questionType": "heading",
//           "questionTypeHeading": {

//           }
//         }, {
//           "id": "15",
//           "question": "This is question 16",
//           "questionType": "wrongtype",
//           "questionTypeHeading": {

//           }
//         },
//       ]
//     },
//     {
//       "id": "2",
//       "title": "Page_02",
//       "isInitial": "true",
//       "hasPublished": "false",
//       "activeSurveyId": "-1",
//       "surveys": [],
//     },
//     {
//       "id": "3",
//       "title": "Page_03",
//       "isInitial": "true",
//       "hasPublished": "false",
//       "activeSurveyId": "-1",
//       "surveys": [],
//     },
//     {
//       "id": "4",
//       "title": "Page_04",
//       "isInitial": "true",
//       "hasPublished": "false",
//       "activeSurveyId": "-1",
//       "surveys": [],
//     },
//   ];

//   return data;
// }
