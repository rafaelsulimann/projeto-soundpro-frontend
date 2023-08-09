export const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0px 0px 0px 20px",
      maxHeight: "40px",
      display: "flex",
      alignContent: "center",
      margin: 0
    }),
    container: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "var(--gray-light-color)",
      margin: 0,
      fontSize: "13px",
    }),
    option: (provided: any) => ({
      ...provided,
      color: "var(--line-color)",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
  };
  