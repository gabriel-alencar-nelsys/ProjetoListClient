import { Box, Tooltip } from "@mui/material";
import Stack from "@mui/material/Button";

export const Header = () => {
  return (
    <Stack sx={{ display: "flex", justifyContent:'space-between'}}>
      <Box 
        component="img"
        sx={{ display:'flex',
          justifyContent:'space-between',
          height: 233,
          width: 50,
          maxHeight: { xs: 20, md: 10 },
          maxWidth: { xs: 100, md: 250 },
        }}
        alt=""
        src="/logo.svg"
      />
      <Tooltip titTooltipe="Histórico">
      <Box
        component="img"
        sx={{display:'flex',
          justifyContent:'space-between',
          height: 233,
          width: 50,
          maxHeight: { xs: 100, md: 10 },
          maxWidth: { xs: 40, md: 10 },
        }}
        alt="Historico"
        src="/menu.svg"
        title="Histórico" 
      />
      </Tooltip>
    </Stack>
  );
};
