/**
 *  Guru MaterialUI Theming File
 *
 *  @description The main file for Theme configuration. details here:
 *  @link https://material-ui.com/customization/themes/#theme-configuration-variables
 */
import { createMuiTheme } from "@material-ui/core/styles";

export const guruTheme = createMuiTheme({
  palette: {
    primary: { main: "#00e286" }
  },
  typography: {
    fontFamily: "Montserrat, Roboto, sans-serif",
    button: {
      fontFamily: "Montserrat, Roboto, sans-serif",
      textTransform: "none"
    },
    h1: { fontFamily: "Montserrat, Roboto, sans-serif" },
    h2: { fontFamily: "Montserrat, Roboto, sans-serif" },
    h3: { fontFamily: "Montserrat, Roboto, sans-serif" },
    h4: { fontFamily: "Montserrat, Roboto, sans-serif" },
    h5: { fontFamily: "Montserrat, Roboto, sans-serif" },
    h6: { fontFamily: "Montserrat, Roboto, sans-serif" }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "0"
      }
    },
    PrivateNotchedOutline: {
      root: {
        borderRadius: "0",
        borderWidth: "3px"
      }
    }
  }
});
