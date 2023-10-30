import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Image } from "@nextui-org/react";
import recycling from "../../assets/recycling_icon.png";

export function Home() {
  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <Image
        width={300}
        alt="Green Return Logo"
        src={recycling}
        radius="none"
      />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Recycle and earn!
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        At Green Return, your recycling efforts pay off. Earn eco-coins for a
        greener planet and exciting rewards. Join us and make a difference
        today!
      </Typography>
    </Container>
  );
}
