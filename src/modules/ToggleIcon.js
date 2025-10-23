
const ToggleIcon = (props) => {
    return (
        <label className="rectangle">
            {props.isChecked?<input type="checkbox" onChange={props.handler}  checked /> : <input type="checkbox" onChange={props.handler} />}
            <span className="toggle"></span>
        </label>
    )
}

export default ToggleIcon;
 