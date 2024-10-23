import { Box, Tooltip } from "@mui/material";
import Stack from "@mui/material/Button";
import Link from "next/link";

export const Header = () => {
  return (
    <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        component="img"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 233,
          width: 50,
          maxHeight: { xs: 30, md: 30 },
          maxWidth: { xs: 100, md: 250 },
        }}
        alt=""
        src="/logo.svg"
      />
      <Link href="/historico">
        <Box
          component="img"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 233,
            width: 50,
            maxHeight: { xs: 100, md: 40 },
            maxWidth: { xs: 50, md: 250 },
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
          alt="Historico"
          src="/menu.svg"
          title="Histórico"
        />
      </Link>
    </Stack>
  );
};
