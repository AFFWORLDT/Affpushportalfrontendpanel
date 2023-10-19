import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

const LANGS = [
  {
    value: 'Eng',
    label: 'India-English',
    icon: '/assets/icons/india-flag-icon.png',
  },
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/ic_flag_de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/ic_flag_fr.svg',
  },
];

export default function LanguagePopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGS[0]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (option) => {
    setSelectedLanguage(option);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(anchorEl && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={selectedLanguage.icon} alt={selectedLanguage.label} />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 160,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === selectedLanguage.value}
              onClick={() => handleLanguageSelect(option)}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
