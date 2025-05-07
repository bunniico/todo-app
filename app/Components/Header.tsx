/**
 * Header component that displays a title and a subtitle using Material-UI Typography.
 *
 * @component
 * @param {HeaderProps} props - The props for the Header component.
 * @param {string} props.title - The main title to display.
 * @param {string} props.subtitle - The subtitle to display below the title.
 * @returns {JSX.Element} A React functional component rendering the header.
 */
import React from "react";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="title" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle" component="h4">
        {subtitle}
      </Typography>
    </div>
  );
};

export default Header;