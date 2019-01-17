module.exports = function() {
  const data = [
    {
      id: 1,
      name: 'Fixture Form 1',
      checked_out: false,
      summary_page: true,
      updater: ' ',
      creator: ' ',
      action: 'N', // N: No Update, U: Update, I: Insert
      pages: [
        {
          id: 1,
          name: 'FA Page 1',
          sequence: 1,
          summary_page: false,
          columns: 2,
          action: 'N',
          questions: [
            {
              id: 1,
              label:
                'Does the Respondent have an ongoing arrangement with a client?',
              sequence: 1,
              help_text:
                'Please check if the respondent has an ongoing arrangement',
              is_default: true,
              placeholder_text:
                'Please check if the respondent has an ongoing arrangement',
              question_type: 1,
              question_type_property: null,
              required: true,
              other_option: false,
              comment_field: false,
              database_table: false,
              database_table_name: 'custtable',
              database_column_type: 'boolean',
              database_column_format: '9',
              database_column_length: '1',
              questionhtml:
                '<div class="inline fields"><label>Does the Respondent have an ongoing arrangement with a client?</label><div class="field"><div class="ui radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="Yes"<label>Yes</label></div></div><div class="field"><div class="ui radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="No"<label>No</label></div></div><div class="grouped fields"><label>HTML radios</label><div class="field"><label><input name="htmlRadios" type="radio">Yes</label></div><div class="field"><label><input name="htmlRadios" type="radio">No</label></div></div>',
              action: 'N',
              validations: [],
              options: [
                {
                  id: 1,
                  label: 'Yes',
                  sequence: 1,
                  is_default: true,
                  value: 'Yes',
                  action: 'N'
                },
                {
                  id: 2,
                  label: 'No',
                  sequence: 2,
                  is_default: false,
                  value: 'No',
                  action: 'N'
                }
              ],
              logics: [
                {
                  id: 1,
                  from_question: 1,
                  to_question: 2,
                  display_condition: '',
                  logic_operator: '',
                  logic_connector: '',
                  value: 'Yes',
                  option: 1,
                  action: 'N'
                },
                {
                  id: 2,
                  from_question: 1,
                  to_question: 5,
                  display_condition: '',
                  logic_operator: '',
                  logic_connector: '',
                  value: 'No',
                  option: 2,
                  action: 'N'
                }
              ]
            },
            {
              id: 2,
              label: 'Please enter the name of the Client entity',
              sequence: 2,
              help_text: 'Enter the Client entity name',
              is_default: false,
              placeholder_text: 'Enter the Client entity name',
              question_type: 3,
              question_type_property: null,
              required: true,
              other_option: false,
              comment_field: false,

              database_table: false,
              database_table_name: 'custtable',
              database_column_type: 'string',
              database_column_format: 'x(100)',
              database_column_length: '100',

              questionhtml:
                '<div class="field"><label>Please enter the name of the Client entity</label><input placeholder="Enter the Client entity name"</div>',
              action: 'N',
              validations: [
                {
                  id: 1,
                  value: '',
                  error_message: 'Please enter a valid value',
                  sequence: 1,
                  validation_type: 'EQUAL_TO',
                  logic_connector: '',
                  action: 'N'
                }
              ],
              options: [],
              logics: []
            }
          ]
        },
        {
          id: 2,
          name: 'FA Page 2',
          sequence: 2,
          summary_page: false,
          columns: 2,
          action: 'N',
          questions: [
            {
              id: 3,
              label:
                'Please confirm that the Client will be requiring a contract',
              sequence: 3,
              help_text: 'Confirmation of client contract',
              is_default: false,
              placeholder_text: 'Client confirmation',
              question_type: 2,
              question_type_property: null,
              required: true,
              other_option: false,
              comment_field: false,
              database_table: false,
              database_table_name: 'custtable',
              database_column_type: 'boolean',
              database_column_format: '9',
              database_column_length: '1',
              questionhtml:
                '<div class="inline fields"><label>Please confirm that the Client will be requiring a contract</label><div class="field"><div class="ui radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="Yes"<label>Yes</label></div></div><div class="field"><div class="ui radio checkbox"><input class="hidden" readonly="" tabindex="0" type="radio" value="No"<label>No</label></div></div><div class="grouped fields"><label>HTML radios</label><div class="field"><label><input name="htmlRadios" type="radio">Yes</label></div><div class="field"><label><input name="htmlRadios" type="radio">No</label></div></div>',
              action: 'N',
              validations: [],
              options: [
                {
                  id: 3,
                  label: 'Yes',
                  sequence: 1,
                  is_default: true,
                  value: 'Yes',
                  action: 'N'
                },
                {
                  id: 4,
                  label: 'No',
                  sequence: 2,
                  is_default: false,
                  value: 'No',
                  action: 'N'
                }
              ],
              logics: [
                {
                  id: 3,
                  from_question: 3,
                  to_question: 4,
                  display_condition: '',
                  logic_operator: '',
                  logic_connector: '',
                  value: 'Yes',
                  option: 1,
                  action: 'N'
                },
                {
                  id: 4,
                  from_question: 3,
                  to_question: 5,
                  display_condition: '',
                  logic_operator: '',
                  logic_connector: '',
                  value: 'No',
                  option: 2,
                  action: 'N'
                }
              ]
            },
            {
              id: 4,
              label: 'Effective date of Contract',
              sequence: 4,
              help_text: 'Effective date of Contract',
              is_default: false,
              placeholder_text: 'Effective Date',
              question_type: 5,
              question_type_property: null,
              required: true,
              other_option: false,
              comment_field: false,
              database_table: false,
              database_table_name: 'custtable',
              database_column_type: 'date',
              database_column_format: 'YYYY-MM-DD',
              database_column_length: '20',
              questionhtml: 'HTML not available at this time',
              action: 'N',
              validations: [],
              options: [],
              logics: []
            }
          ]
        },
        {
          id: 3,
          name: 'FA Page 3',
          sequence: 3,
          summary_page: true,
          columns: 2,
          action: 'N',
          questions: [
            {
              id: 5,
              label: 'Please confirm and accept this intake form',
              sequence: 5,
              help_text: 'Please confirm and accept this intake form',
              is_default: false,
              placeholder_text: 'Please confirm and accept this intake form',
              question_type: 7,
              question_type_property: null,
              required: true,
              other_option: false,
              comment_field: false,
              database_table: false,
              database_table_name: 'custtable',
              database_column_type: 'boolean',
              database_column_format: '9',
              database_column_length: '1',
              questionhtml:
                '<div class="field"><div class="ui checkbox"><input class="hidden" readonly="" tabindex="0" type="checkbox" value=""><label>Please confirm and accept this intake form</label></div>',
              action: 'N',
              validations: [],
              options: [],
              logics: []
            }
          ]
        }
      ]
    }
  ];

  return data;
};
