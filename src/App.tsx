import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import TodoItems from "./components/TodoItems";
import Modal from "./components/Modal";

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saveDarkMode = localStorage.getItem("darkMode");

        if (saveDarkMode) {
            return JSON.parse(saveDarkMode);
        } else {
            return false;
        }
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [todo, setTodo] = useState<string>("");
    const [todoList, setTodoList] = useState<
        { title: string; completed: boolean }[] | []
    >(() => {
        const saveTodoList = localStorage.getItem("todoList");

        if (saveTodoList) {
            return JSON.parse(saveTodoList);
        } else {
            return [];
        }
    });

    const toggleDarkMode = (): void => {
        setDarkMode((prev) => {
            localStorage.setItem("darkMode", JSON.stringify(!prev));
            return !prev;
        });
    };

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const addTodo = () => {
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
        localStorage.setItem(
            "todoList",
            JSON.stringify([...todoList, { title: todo, completed: false }])
        );
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
        localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    };

    const removeTodo = (updatedIndex: number) => {
        const updatedTodoList = todoList.filter(
            (_, index) => index !== updatedIndex
        );

        setTodoList(updatedTodoList);
        localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    };

    const toggleModal = (status: boolean) => {
        setShowModal(status);
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

                <Searchbar
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

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
                    <TodoItems
                        todoList={todoList}
                        setTodoCompleted={setTodoCompleted}
                        removeTodo={removeTodo}
                    />
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
                <Modal
                    todo={todo}
                    inputChange={inputChange}
                    addTodo={addTodo}
                    toggleModal={toggleModal}
                />
            )}
        </div>
    );
}

export default App;
