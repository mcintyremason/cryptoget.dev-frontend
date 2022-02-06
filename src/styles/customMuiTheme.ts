import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

// This file IS for globally applied styling across a specific Material-UI component.
// Instructions on overriding Material-UI component styling, https://material-ui.com/customization/globals/#css.
let customTheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '5px 10px',
      },
    },
  },
})

customTheme = responsiveFontSizes(customTheme)
export default customTheme
