
const ThemeToggleComp = () => {
    return (
        <div className="check" style={{ margin: "2px 18px 0 0" }}>
            <input id="check" type="checkbox" />
            <label htmlFor="check" data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Select Theme"></label>
        </div>)
}

export default ThemeToggleComp