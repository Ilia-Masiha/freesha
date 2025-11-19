export const SelectStyles = {
  container: (baseStyles, state) => ({
    ...baseStyles,
    border: 0,
    outline: 0,
    position: "relative",
    backgroundColor: "transparent",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-primary)",
    border: "none",
    outline: "none",
    cursor: "pointer",
    "&:hover": {
      color: "var(--color-secondary)",
    },
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    display: "flex",
    borderRadius: "0.5rem",
    padding: "0.2rem 0",
    backdropFilter: "blur(16px)",
    color: "#fff",
    border: "1px solid var(--color-tertiary)",
    boxShadow: "none",
    outline: 0,
    "&:hover": {
      border: "1px solid var(--color-tertiary)",
    },
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-primary)",
    "&:focus": {
      padding: 0,
      margin: 0,
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-primary)",
    backgroundColor: "var(--color-bg-primary)",
    maxHeight: "130px",
    overflowY: "auto",
    position: "absolute",
    zIndex: 60,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? "var(--color-secondary)" : "transparent",
    color:"var(--color-primary)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--color-secondary)",
      backdropFilter: "blur(16px)",
    },
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-primary)",
  }),
  multiValue: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "var(--color-tertiary)",
  }),
  multiValueLabel: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-primary)",
    backgroundColor : "var(--color-secondary)"
  }),
  clearIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-error)",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  }),
};
