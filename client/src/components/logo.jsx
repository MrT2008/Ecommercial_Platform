const Logo = ({size="", changeColor="", changeID ="" }) => {
    return (
        <div className={`logo font-bold ${size}`}>
            <h2>
                <span className={`${changeColor} ${changeID}` } id="ez">EZ</span>
                <span className={`${changeColor} ${changeID}`} id="mall">Mall</span>
            </h2>
        </div>
    );
}
export default Logo;