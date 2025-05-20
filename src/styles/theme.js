import { darken, lighten, rgba } from 'polished';

const primaryColor = 'rgb(12, 47, 80)';

const theme = {
  colors: {
    primary: primaryColor,
    primaryDark: darken(0.2, primaryColor), 
    primaryDarkTwo: darken(0.35, primaryColor),
    primaryLight: lighten(0.15, primaryColor),
    primaryTransparent1: rgba(primaryColor, 0.5),
    primaryTransparent2: rgba(primaryColor, 0.15),

    background: darken(0.45, primaryColor),
    text: darken(0.8, primaryColor),
    placeholder: darken(0.25, primaryColor),

    disabledBg: lighten(0.45, primaryColor),
    disabledBorder: lighten(0.3, primaryColor),
    disabledText: darken(0.1, primaryColor),

    // Input
    inputBorder: primaryColor,
    inputBg: lighten(.65, primaryColor),

    // Card
    cardLight: lighten(0.65, primaryColor),

    // Link
    link: lighten(0.95, primaryColor),
    linkHover: lighten(0.55, primaryColor),

    // Button
    button: lighten(0.2, primaryColor),
    buttonHover: lighten(0.05, primaryColor),
    success: "green",
    warning: "#ffc107",
    warningDark: "#e0a800",
    info: "#17a2b8",
    infoDark: "#117a8b",
    error: "#dc3545",
    errorDark: "#c82333",
  },
};

export default theme;