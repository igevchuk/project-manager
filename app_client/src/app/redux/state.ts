export type Todo = {
  id?: number;
  text: string;
  completed: boolean;
};

export type IState = {
  activeForm?: form;
  forms?: form[];
  templates?: template[];
};

export enum action {
  N = 'Null',
  U = 'Update',
  I = 'Insert',
  D = 'Delete'
}

export enum status {
  draft,
  published
}

export enum question_type {
  text,
  select,
  checkbox,
  datetime,
  heading
}

export enum mode {
  templates = 'templates',
  design = 'design',
  conditions = 'conditions',
  variables = 'variables',
  preview = 'preview',
  form_tree = 'form tree'
}

export type form = {
  id?: number;
  name?: string;
  checked_out?: boolean;
  summary_page?: boolean;
  updater?: string;
  creator?: string;
  action?: action;
  templates?: template[];
  pages?: page[];
  status?: status;

  // frontent property
  activeMode?: mode;
  activePage?: page;
  activePageId?: number;
  valueObject?: {};
  formQuery?: {};
  isDropped?: boolean;

  initialAmountOfLogics?: number;
  initialAmountOfQuestions?: number;

  formMeta?: {
    id: number;
    name?: string;
    // checked_out?: boolean;
    action?: action;
    // status?: status;
    querySurveys?: object[];

    // lastEdited?: Date;
    // lastEditedBy?: string;
    // created?: number;
  };
};

export type page = {
  id?: number;
  name?: string;
  sequence?: number;
  summary_page?: boolean;
  columns?: number;
  action?: action;
  questions?: question[];

  // frontent property
  activeSurveyId?: number;
  nameEditing?: boolean; // a flag for tracking page name
  valueObject: {};
  conditionSource?: object[]; // for logics using
  switchPage?: boolean;
  hasDragged?: boolean;
  // bellowing will be removed
  operationDialog?: {};
  // changeName?: boolean;
  // hasPublished?: boolean;
  // title?: string;
  // surveys?: question[];
};

export type question = {
  id?: number;
  label?: string;
  sequence?: number;
  help_text?: string;
  is_default?: boolean;
  placeholder_text?: string;
  question_type?: number;
  question_type_property?: any;
  required?: boolean;
  other_option?: boolean;
  comment_field_?: boolean;
  database_table?: boolean;
  database_table_name?: string;
  database_column_type?: boolean;
  database_column_format?: number;
  database_column_length?: number;
  questionhtml?: string;
  action?: action;

  validation: {
    text: {
      action?: action;
      question_type: number; // 3
      // rules is valiue object, and need to be provided from backend as soure of dropdown list
      rules: [
        {
          value: string; // value options: contains|notContains|startsWith|equals|notEquals|advanced
          text: string; // text options: Contains|Does not Contain|Starts With|Equals|Not Equals|Advanced
        }
      ];
      rule_value: string; // user selected/filled
      length: {
        // UI: dropdown list
        min: number;
        max: number;
      };
    };
    select: {
      action?: action;
      question_type: number; // 1
      // value: 0 1 2 3 4 ALL, UI: dropdown list
      number_of_choices_permitted: {
        min: number;
        max: number;
      };
    };
    date: {
      // ONLY ALLOW DATES IN THE:
      action?: action;
      question_type: number; // 5
      only_allow_dates_in_the: boolean;
      date_type_value: string; // value: past|future|range|(advanced)
      range: {
        // when date_type_value = range, UI: date picker
        from: Date;
        to: Date;
      };
      custome_script: string; // when date_type_value = advanced
    };
  };
  // validations?: validation[];
  options?: option[];
  logics?: logic[];

  // adding following properties
  default_text: string;
  // with text type: question_type = 3
  text__multiple_lines_of_text: boolean;
  text__number_lines_of_text: number;
  // with select type: question_type = 1
  select__dropdown: boolean;
  select__label_text: string;
  // date/time type
  date__date_format: string;
  date__time_format: string;
  // heading type
  heading__font: string;
  heading__font_size: string;
  heading__is_bold: boolean;
  heading__is_underscore: boolean;
  heading__is_italic: boolean;
  heading__related_questions: [];

  isInitial?: boolean;
  isDragging?: boolean;
  onSettings?: boolean;
  questionType?: question_type;
  viewModel?: {
    questionTypeText?: question_text;
    questionTypeSelect?: question_select;
    questionTypeCheckbox?: question_checkbox;
    questionTypeDatetime?: question_datetime;
    questionTypeHeading?: question_heading;
  };
};

export type validation = {
  id?: number;
  value?: string;
  error_message?: string;
  sequence?: number;
  validation_type?: string;
  logic_connector?: string;
  action?: action;
};

export type option = {
  id?: number;
  label?: string; // "Yes"
  sequence?: number;
  is_default?: boolean;
  value?: string; // Yes
  action?: action;
};

export type logic = {
  id?: number;
  from_question?: number;
  to_question?: number;
  display_condition?: string;
  logic_operator?: string;
  logic_connector?: string;
  value?: string; // Yes
  option?: number;
  action?: action;

  // added only with frontend
  from: number;
  to: number;
  operator: string;
  condition: string;
  connector: string; // value: and|or|none
};

export type survey = {
  id?: number;
  isDraft?: string;
  onSettings?: string;
  question?: string;
  questionType?: question_type;
  isRequired?: string;
  timestamp?: string; // '1461974250213',
  questionTypeText?: question_text;
  questionTypeSelect?: question_select;
  questionTypeCheckbox?: question_checkbox;
  questionTypeDatetime?: question_datetime;
  questionTypeHeading?: question_heading;
};

export type question_text = {
  multiLine?: boolean;
  numberLine?: number;
  default?: {
    value?: string;
    plaseholder?: string;
  };
  plaseholder?: {
    value?: string;
    plaseholder?: string;
  };
  description?: {
    value?: string;
    plaseholder?: string;
  };

  validation?: {
    action?: action;
    // rules is valiue object, and need to be provided from backend as soure of dropdown list
    rule_source: [
      {
        value: string; // value options: contains|notContains|startsWith|equals|notEquals|advanced
        text: string; // text options: Contains|Does not Contain|Starts With|Equals|Not Equals|Advanced
      }
    ];
    rule_value: {
      rule: string;
      value: string;
    };
    length: {
      // UI: dropdown list
      min: number;
      max: number;
    };
  };

  // options?: option[];

  logics: {
    show: {
      show: string;
      onlyIf: logic[];
    };
    skip: {
      skip: string;
      if: logic[];
    };
  };
};

export type question_select = {
  optionType: {
    label: string;
    value: boolean;
    // UI: checkbox
  };

  addAnOtherOption?: {
    option?: boolean;
    label?: {
      value?: string;
      plaseholder?: string;
    };
  };
  includeACommentField?: {
    option?: boolean;
    plaseholder?: {
      value?: string;
      plaseholder?: string;
    };
  };
  description?: {
    value?: string;
    plaseholder?: string;
  };

  validation?: {
    action?: action;
    question_type: number; // 1
    // label: string;
    // value: 0 1 2 3 4 ALL, UI: dropdown list
    number_of_choices_permitted: {
      label: string;
      min: string;
      max: string;
    };
  };

  options?: option[];

  logics: {
    show: {
      show: string;
      onlyIf: logic[];
    };
    skip: {
      skip: string;
      if: logic[];
    };
  };
};

export type question_checkbox = {
  addAnOtherOption?: {
    option?: boolean;
    label?: {
      value?: string;
      plaseholder?: string;
    };
  };
  includeACommentField?: {
    option?: boolean;
    plaseholder?: {
      value?: string;
      plaseholder?: string;
    };
  };

  validation?: {
    action?: action;
    question_type: number; // 1
    // value: 0 1 2 3 4 ALL, UI: dropdown list
    number_of_choices_permitted: {
      min: number;
      max: number;
    };
  };

  options?: option[];

  logics: {
    show: {
      show: string;
      onlyIf: logic[];
    };
    skip: {
      skip: string;
      if: logic[];
    };
  };
};

export type question_datetime = {
  dateFormat?: string;
  timeFormat?: string;
  default?: {
    value?: string;
    plaseholder?: string;
  };
  plaseholder?: {
    value?: string;
    plaseholder?: string;
  };
  description?: {
    value?: string;
    plaseholder?: string;
  };
  validation?: {
    action?: action;
    question_type: number; // 5
    only_allow_dates_in_the: {
      // ONLY ALLOW DATES IN THE:
      label: string;
      value: boolean;
    };
    date_range: {
      labels: string[]; // value: past|future|range|(advanced)
      value: string;
    };
    // date_type_value: string;
    range: {
      // when date_type_value = range, UI: date picker
      from: Date;
      to: Date;
    };
    custome_script: string; // when date_type_value = advanced
  };

  // options?: option[];

  logics: {
    show: {
      show: string;
      onlyIf: logic[];
    };
    skip: {
      skip: string;
      if: logic[];
    };
  };
};

export type question_heading = {};

export type template = {
  approval_required?: boolean;
  checked_out?: string;
  created?: string;
  creator?: string;
  creatoremail?: string;
  creatorid?: number;
  id?: number;
  last_decision?: string;
  published?: string;
  publisher?: string;
  updated?: string;
  updater?: string;
  updateremail?: string;
  updaterid?: number;
  value?: string;
  variants?: template_variant[];
};

export type template_variant = {
  description?: string;
  id?: number;
  name?: string;
};
