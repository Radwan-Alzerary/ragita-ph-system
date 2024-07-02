import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

import { blue, red } from "@mui/material/colors";
import { Button, IconButton } from "@mui/material";

function Header() {
  return (
    <header className="flex h-[7%] bg-white w-full justify-between items-center px-4">
      <div>
        <Button variant="contained"  sx={{background:red[600]}}>
          تسجيل الخروج
        </Button>
      </div>
      <div className="flex">
        <IconButton aria-label="fingerprint" color="secondary">
        <FullscreenOutlinedIcon
            sx={{ color: blue[500] }}
            style={{ fontSize: "32px" }}
          ></FullscreenOutlinedIcon>
        </IconButton>
        <IconButton aria-label="fingerprint" color="success">
        <PowerSettingsNewOutlinedIcon
            sx={{ color: red[500] }}
            style={{ fontSize: "32px" }}
          ></PowerSettingsNewOutlinedIcon>
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
