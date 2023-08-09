import Select from "react-select";

export default function FormSelect(props: any) {
  const {
    className,
    validation,
    invalid = "false",
    dirty = "false",
    onTurnDirty,
    ...selectProps
  } = props;

  function handleTurnDirty() {
    onTurnDirty(props.name);
  }

  return (
    <div data-invalid={invalid} data-dirty={dirty} className={className}>
      <Select
        {...selectProps}
        onBlur={handleTurnDirty}
        className="input-select-itens"
      />
    </div>
  );
}
