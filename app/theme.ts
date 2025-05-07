import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
    subtitle: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    subtitle?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    subtitle: true;
  }
}

const theme = createTheme({
    typography: {
        fontFamily: "Roboto, sans-serif",
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginTop: 40,
          },
          subtitle: {
            fontSize: "1.25rem",
            fontWeight: 400,
            textAlign: "center",
            marginTop: 10,
          },
    },
    palette: {
        primary: {
        main: "#FFBA08", // Primary color for the app
        },
        secondary: {
        main: "#03071E", // Secondary color for the app
        },
        background: {
            default: "#f8f9fa", // Background color
        },
    },
    components: {
        MuiButton: {
        styleOverrides: {
            root: {
            backgroundColor: "#FFBA08", // Button background color
            color: "#03071E", // Button text color
            "&:hover": {
                backgroundColor: "#FFBA08", // Button hover background color
            },
            },
        },
        },
    },
    });

    export default theme;