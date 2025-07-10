import clsx from "clsx";
import { useEffect, useState } from "react";

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [todo, setTodo] = useState<string>("");
    const [todoList, setTodoList] = useState<
        { title: string; completed: boolean }[]
    >([]);

    const handleSetTodoList = () => {
        if (todo === "" || todo.trim() === "") {
            alert("Todo must be a valid value");
            return;
        }

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].title === todo) {
                alert("Todo already exists");
                return;
            }
        }

        setShowModal(false);
        setTodoList([...todoList, { title: todo, completed: false }]);
        setTodo("");
    };

    const setTodoCompleted = (updatedIndex: number) => {
        const updatedTodoList = todoList.map((item, index) => {
            if (index === updatedIndex) {
                return {
                    ...item,
                    completed: !item.completed
                };
            }

            return item;
        });

        setTodoList(updatedTodoList);
    };

    const removeTodo = (updatedIndex: number) => {
        const updatedTodoList = todoList.filter(
            (_, index) => index !== updatedIndex
        );

        setTodoList(updatedTodoList);
    };

    useEffect(() => {
        const html = document.documentElement;

        if (darkMode) html.classList.add("dark");
        else html.classList.remove("dark");
    }, [darkMode]);

    return (
        <div className="flex justify-center bg-[#F7F7F7] dark:bg-[#252525] min-h-dvh">
            <div className="relative flex flex-col items-center w-[750px]">
                <h1 className="text-[#252525] dark:text-[#F7F7F7] text-[26px] font-medium mt-[40px] mb-[18px]">
                    TODO LIST
                </h1>

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
                            setDarkMode(!darkMode);
                        }}
                    >
                        {darkMode ? (
                            <img src="./assets/icons/dark.svg" alt="" />
                        ) : (
                            <img src="./assets/icons/light.svg" alt="" />
                        )}
                    </button>
                </div>

                {todoList.length === 0 && (
                    <div className="mt-[30px]">
                        {darkMode ? (
                            <img src="./assets/icons/empty-dark.svg" alt="" />
                        ) : (
                            <img src="./assets/icons/empty-light.svg" alt="" />
                        )}

                        <p className="text-[20px] font-normal text-[#252525] dark:text-[#F7F7F7] leading-none text-center mt-[20px]">
                            Empty
                        </p>
                    </div>
                )}

                {todoList.length > 0 && (
                    <ul className="w-[520px] mt-[30px]">
                        {todoList.map((item, index) => (
                            <li
                                key={item.title}
                                className="flex items-center not-last:border-b not-last:border-b-[#6C63FF] not-last:border-solid not-last:mb-[17px]"
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        className="peer hidden"
                                    />
                                    <span
                                        className="relative inline-block size-[26px] border border-solid border-[#6C63FF] rounded-[2px] peer-checked:bg-[#6C63FF] text-[#F7F7F7] dark:text-[#252525] dark:peer-checked:text-[#F7F7F7] cursor-pointer"
                                        onClick={() => {
                                            setTodoCompleted(index);
                                        }}
                                    >
                                        <i className="fa-solid fa-check absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)]"></i>
                                    </span>
                                </label>
                                <p
                                    className={clsx(
                                        "ml-[17px] text-[20px] text-[#252525] dark:text-[#F7F7F7] font-medium leading-none",
                                        item.completed &&
                                            "line-through text-[rgba(37,37,37,0.50)] dark:text-[rgba(255,255,255,0.50)]"
                                    )}
                                >
                                    {item.title}
                                </p>
                                {!item.completed && (
                                    <div className="ml-auto">
                                        <button>
                                            <img
                                                src="./assets/icons/edit.svg"
                                                alt=""
                                            />
                                        </button>
                                        <button
                                            onClick={() => {
                                                removeTodo(index);
                                            }}
                                        >
                                            <img
                                                src="./assets/icons/remove.svg"
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="absolute right-0 bottom-[32px] flex justify-center items-center size-[50px] rounded-[50%] !bg-[#6C63FF] hover:bg-[#5850DD]! hover:shadow-[0px_0px_4px_0px_#6C63FF]"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <img src="./assets/icons/add.svg" alt="" />
                </button>
            </div>

            {showModal && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 flex justify-center bg-[rgba(37,37,37,0.70)]"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    <div
                        className="w-[500px] h-fit p-[18px_30px] bg-[#F7F7F7] dark:bg-[#252525] rounded-[16px] mt-[118px] border border-solid border-[#F7F7F7]"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <p className="text-[#252525] dark:text-[#F7F7F7] text-[24px] font-medium mb-[25px] text-center">
                            NEW NOTE
                        </p>
                        <input
                            type="text"
                            className="w-full h-[40px] p-[8px_16px]! rounded-[5px] border! border-solid! border-[#6C63FF]! dark:border-[#F7F7F7]! text-[#C3C1E5] dark:text-[#666666] font-[Inter]! text-[16px] leading-none font-medium"
                            placeholder="Input your note..."
                            value={todo}
                            onChange={(e) => {
                                setTodo(e.target.value);
                            }}
                        />
                        <div className="flex justify-between mt-[128px]">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                }}
                                className="border! border-solid! border-[#6C63FF]! rounded-[5px] p-[10px_22px]! text-[#6C63FF] text-[18px] font-medium leading-none hover:shadow-[0px_0px_4px_0px_#6C63FF]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleSetTodoList();
                                }}
                                className="bg-[#6C63FF]! rounded-[5px] p-[10px_22px]! text-[#F7F7F7] text-[18px] font-medium leading-none hover:bg-[#5850DD]! hover:shadow-[0px_0px_4px_0px_#6C63FF]"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
