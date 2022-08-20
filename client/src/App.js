import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'

import Signup from './components/Signup'


function App() {

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Signup />
      </ThemeProvider>
  )
}

export default App
