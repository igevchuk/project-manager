const base = {
  darkblue: 'rgb(0,40,136)',
  green: 'rgb(67,160,71)',
  lllgreen: 'rgb(232,245,232)',
  llviolet: 'rgb(159,168,218)',
  lllviolet: 'rgb(232,234,246)',
  brandGray: 'rgb(74,74,74)',
  lightgray: 'rgba(189, 189, 189, 0.24)',
  tableBorderGray: 'rgba(0, 0, 0, 0.12)',
  dangerRed: 'rgb(244,67,54)',
  lightyellow: 'rgb(255,252,220)',
  inputBorderGray: 'rgb(210,210,210)',
  white: 'rgb(255,255,255)',
  tableTitle: 'rgb(117, 117, 117)',
  hint: 'rgb(139,152,152)'
};

export const theme = {
  colorRoles: {
    primary: base.darkblue,
    secondary: base.green,
    default: base.brandGray,
    textPrimary: base.brandGray,
    lightgray: base.lightgray,
    hint: base.hint,
    error: base.dangerRed
  },
  typography: {
    fontMono: "'Courier', 'monospace'",
    fontFamilySans: "'Helvetica', 'Arial', sans-serif",
    fontSans: "'Roboto', 'Helvetica', 'Arial', 'Roboto', 'sans-serif'",
    roboto: "'Roboto', 'Helvetica', 'Arial', 'Roboto', 'sans-serif'",
    defaultFont: "'Roboto', 'Helvetica', 'Arial', 'Roboto', 'sans-serif'",
    baseFontColor: 'rgb(74,74,74)',
    baseFontFamily: "'Roboto', 'Helvetica', 'Arial', 'Roboto', 'sans-serif'",
    baseFontSize: '14px/25px',
    smallFontSize: '12px',
    fontLight: '300',
    fontNormal: '400',
    fontSemibold: '600',
    fontBold: '700',
    baseLineHeight: '1.5em'
    // headings: (6, 5, 4, 3, 2, 1);
  },
  borders: {
    baseBorder: '1px solid rgb(74,74,74)',
    baseRadius: '0.25rem',
    basePadding: '10px',
    baseMargin: '0 1em',
    baseFontSize: '16px',
    lineHeight: '28.8px'
  },
  Shadows: {
    // baseBoxShadow: rgba(darken($brand-gray, 20%), 0.2) 0 0 5px,
    boxShadow:
      '0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    paperBoxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2)',
    buttonBoxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
  },
  Dimensions: {
    sidebarWidth: '256px',
    headerHeight: '64px'
  },
  Buttons: {
    primaryButton: 'rgb(67,160,71)',
    secondaryButton: 'rgb(255,255,255)',
    alternateButton: 'rgb(0,40,136)',
    disabledButton: 'rgba(189, 189, 189, 0.24)'
  },
  Tables: {
    baseBorder: '1px solid rgb(204, 204, 204)',
    tableBorder: '1px solid rgba(0, 0, 0, 0.12)'
  }
};
