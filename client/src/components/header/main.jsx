import Logo from "../shares/logo";
import SearchBar from "../searchBar";
import Button from "../shares/Button";

const HeadingBar = () => {
    return (
        <div className="w-full flex flex-col md:flex-row items-center border-b border-gray-300 px-4 py-3 gap-4 md:gap-0">
            <a href="/" className="w-full md:w-auto flex justify-center md:block">
                <Logo size="text-xl md:text-2xl" id="logo" />
            </a>
            
            <div className="w-full md:w-1/2 px-2">
                <SearchBar />
            </div>
            
            <div className="w-full md:w-1/4 flex justify-center md:justify-end gap-4">
                <Button 
                    text="Log In" 
                    id="login" 
                    href="/login"
                    otherClassName="button text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2"
                />
                <Button 
                    text="Sign Up" 
                    id="signup" 
                    href="/signup"
                    otherClassName="button text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2"
                />
            </div>
        </div>
    )
}
export default HeadingBar;