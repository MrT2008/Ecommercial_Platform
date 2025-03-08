import Logo from "../logo";
import SearchBar from "../searchBar";
import Button from "../Button";
const HeadingBar = () => {
    return (
        <div className="w-full justify-around items-center border-b border-gray-300 flex pt-3 pb-3">
            <Logo size="text-2xl" />
            <SearchBar />
            <div className="flex w-1/4 items-center justify-around">
                <Button text="Sign In" id="signin"/>
                <Button text="Sign Up" id="signup"/>
            </div>
        </div>
    )
}
export default HeadingBar;