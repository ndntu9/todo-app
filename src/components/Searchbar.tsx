interface SearchbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

function Searchbar({ darkMode, toggleDarkMode }: SearchbarProps) {
    return (
        <div className="w-[100%] flex justify-between items-center">
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="relative w-[597px] h-[40px] rounded-[5px] border border-solid border-[#6C63FF] dark:border-[#F7F7F7] p-[8px_16px] focus-within:outline-[2px] focus-within:outline-solid focus-within:outline-[rgba(108,99,255,0.40)] dark:focus-within:outline-[(255,255,255,0.40)]">
                    <input
                        type="text"
                        placeholder="Search note..."
                        className="w-[100%] h-[22px] pr-[40px]! font-[Inter]! text-[#C3C1E5] dark:text-[#666666] text-[16px] font-medium leading-none"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="absolute top-[-1px] right-[-1px] flex justify-center items-center size-[40px]"
                    >
                        <img
                            src="./assets/icons/search.svg"
                            alt=""
                            className="dark:filter-[brightness(0)_saturate(100%)_invert(99%)_sepia(3%)_saturate(403%)_hue-rotate(248deg)_brightness(121%)_contrast(94%)]"
                        />
                    </button>
                </div>
            </form>

            <button className="flex justify-center items-center gap-[27px] w-[85px] h-[40px] rounded-[5px] bg-[#6C63FF]! text-[#F7F7F7] text-[18px] font-medium leading-none hover:bg-[#5850DD]! hover:shadow-[0px_0px_4px_0px_#6C63FF]">
                ALL
                <img src="./assets/icons/arrow-down.svg" alt="" />
            </button>

            <button
                className="flex justify-center items-center size-[40px] rounded-[5px] bg-[#6C63FF]! hover:bg-[#5850DD]! hover:shadow-[0px_0px_4px_0px_#6C63FF]"
                onClick={() => {
                    toggleDarkMode();
                }}
            >
                {darkMode ? (
                    <img src="./assets/icons/dark.svg" alt="" />
                ) : (
                    <img src="./assets/icons/light.svg" alt="" />
                )}
            </button>
        </div>
    );
}

export default Searchbar;
