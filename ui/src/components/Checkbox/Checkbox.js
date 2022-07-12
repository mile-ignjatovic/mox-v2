const Checkbox = (props) => {
  return (
    <div>
      <input type="checkbox" onChange={(e) => props.handleCheckbox(e.target.checked, props.item)} checked={props.value}/>
    </div>
  );
};
export { Checkbox };