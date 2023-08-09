import { useEffect, useState } from "react";

export default function FormInput(props: any) {
  const {
    validation,
    invalid = "false",
    dirty = "false",
    onTurnDirty,
    labelId,
    ...inputProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if(inputProps.value !== undefined && inputProps.value !== "" ){
        setIsEmpty(false);
    }
  },[inputProps.value])

  function handleTurnDirty() {
    onTurnDirty(props.name);
    setIsFocused(false);
    if(inputProps.value === undefined || inputProps.value === "" ){
        setIsEmpty(true);
    }
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleMouseEnter(){
    setIsHovered(true);
  }

  function handleMouseLeave(){
    setIsHovered(false);
  }

  return (
    <>
      <input
        onFocus={handleFocus}
        onBlur={handleTurnDirty}
        {...inputProps}
        placeholder={isFocused ? '' : inputProps.placeholder} 
        style={{border: isFocused ? "1px solid var(--purple-color)" : !isEmpty || isHovered ? "1px solid var(--border-gray-color)" : ""}}
        data-invalid={invalid}
        data-dirty={dirty}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <label
        htmlFor={labelId}
        style={{
          background: isFocused || !isEmpty ? "#232325" : "",
          padding: isFocused || !isEmpty ? "0px" : "15px 10px",
          transform: isFocused ? "translateY(-10px) translateX(10px)" : !isEmpty ? "translateY(-10px) translateX(10px)" : "",
          display: isFocused || !isEmpty ? "flex" : "none",
          color: isFocused ? "var(--purple-color)" : "white",
        }}
      >
        {...inputProps.placeholder}
      </label>
    </>
  );
}
