export default function FormTextarea(props: any) {
    const {
      validation,
      invalid = "false",
      dirty = "false",
      onTurnDirty,
      ...textareaProps
    } = props;
  
    function handleTurnDirty() {
      onTurnDirty(props.name);
    }
  
    return (
      <textarea
      {...textareaProps}
        onBlur={handleTurnDirty}
        data-invalid={invalid}
        data-dirty={dirty}
      />
    );
  }
  