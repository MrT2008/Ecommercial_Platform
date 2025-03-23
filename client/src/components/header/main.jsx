import Logo from "../shares/logo";
import SearchBar from "../searchBar";
import Button from "../shares/Button";
const HeadingBar = () => {
    return (
        <div className="w-full justify-around items-center border-b border-gray-300 flex pt-3 pb-3">
            <a href="/">
                <Logo size="text-2xl" id="logo" />
            </a>
            <SearchBar />
            <div className="flex w-1/4 items-center justify-around">
                <Button text="Log In" id="login" href="/login"/>
                <Button text="Sign Up" id="signup" href="/signup"/>
            </div>
        </div>
    )
}
export default HeadingBar;