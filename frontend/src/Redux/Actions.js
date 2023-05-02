export const DARK = "DARK";
export const LIGHT = "LIGHT";
export const MODE = "MODE";

export const handleDark = () => {
  return {
    type: DARK,
  };
};

export const handleLight = () => {
  return {
    type: LIGHT,
  };
};

export const handleMode = (currentMode) => {
  return {
    type: MODE,
    payload: {
      mode: !currentMode,
    },
  };
};
