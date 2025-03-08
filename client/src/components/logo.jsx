const Logo = ({size=""}) => {
    return (
        <div className={`logo font-bold ${size}`}>
            <h2>
                <span id="ez">EZ</span>
                <span id="mall">Mall</span>
            </h2>
        </div>
    );
}
export default Logo;