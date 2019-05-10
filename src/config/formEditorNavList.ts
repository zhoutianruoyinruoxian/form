/**
* `组件导航列表`
*/

import NMap from 'src/constant/formEditorNameMap';


export default [
  {
    'type': NMap.TEXT, 'title': '文本', 'icon': 'file-text', 'width': 1, defaultOption:
    {
      "fieldType": "FormField",
      "id": "label",
      "name": "文本",
      "type": NMap.TEXT,
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "layout": null
    }
  },
  {
    'type': NMap.PASSWORD, 'title': '密码', 'icon': 'file-text', 'width': 1, defaultOption:
    {
      "fieldType": "FormField",
      "id": "label",
      "name": "密码",
      "type": NMap.PASSWORD,
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "layout": null
    }
  },
  {
    'type': NMap.MUlTILINETEXT, 'title': '多行文本', 'icon': 'file-text', 'width': 1, defaultOption:
    {
      "fieldType": "FormField",
      "id": "label",
      "name": "密码",
      "type": NMap.MUlTILINETEXT,
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "layout": null
    }
  },
  { 'type': 'integer', 'title': '数字', 'icon': 'file-text', 'width': 1 },
  // { 'type': 'decimal', 'title': $translate.instant('FORM-BUILDER.PALLETTE.DECIMAL'), 'icon': 'images/form-builder/decimalfield-icon.png', 'width': 1 },
  // { 'type': 'boolean', 'title': $translate.instant('FORM-BUILDER.PALLETTE.CHECKBOX'), 'icon': 'images/form-builder/booleanfield-icon.png', 'width': 1 },
  // { 'type': 'date', 'title': $translate.instant('FORM-BUILDER.PALLETTE.DATE'), 'icon': 'images/form-builder/datefield-icon.png', 'width': 1 },
  // { 'type': 'dropdown', 'title': $translate.instant('FORM-BUILDER.PALLETTE.DROPDOWN'), 'icon': 'images/form-builder/dropdownfield-icon.png', 'width': 1 },
  // { 'type': 'radio-buttons', 'title': $translate.instant('FORM-BUILDER.PALLETTE.RADIO'), 'icon': 'images/form-builder/choicefield-icon.png', 'width': 1 },
  // { 'type': 'people', 'title': $translate.instant('FORM-BUILDER.PALLETTE.PEOPLE'), 'icon': 'images/form-builder/peoplefield-icon.png', 'width': 1 },
  // { 'type': 'functional-group', 'title': $translate.instant('FORM-BUILDER.PALLETTE.GROUP-OF-PEOPLE'), 'icon': 'images/form-builder/peoplefield-icon.png', 'width': 1 },
  // { 'type': 'upload', 'title': $translate.instant('FORM-BUILDER.PALLETTE.UPLOAD'), 'icon': 'images/form-builder/uploadfield-icon.png', 'width': 1 },
  // { 'type': 'expression', 'title': $translate.instant('FORM-BUILDER.PALLETTE.EXPRESSION'), 'icon': 'images/form-builder/readonly-icon.png', 'width': 1 },
  // { 'type': 'hyperlink', 'title': $translate.instant('FORM-BUILDER.PALLETTE.HYPERLINK'), 'icon': 'images/form-builder/hyperlink-icon.png', 'width': 1 },
  // { 'type': 'spacer', 'title': $translate.instant('FORM-BUILDER.PALLETTE.SPACER'), 'icon': 'images/form-builder/spacer-icon.png', 'width': 1 },
  // { 'type': 'horizontal-line', 'title': $translate.instant('FORM-BUILDER.PALLETTE.HORIZONTAL-LINE'), 'icon': 'images/form-builder/horizontal-line-icon.png', 'width': 1 },
  // { 'type': 'headline', 'title': $translate.instant('FORM-BUILDER.PALLETTE.HEADLINE'), 'icon': 'images/form-builder/headline-icon.png', 'width': 1 },
  // { 'type': 'headline-with-line', 'title': $translate.instant('FORM-BUILDER.PALLETTE.HEADLINE-WITH-LINE'), 'icon': 'images/form-builder/headline-with-line-icon.png', 'width': 1 }
];