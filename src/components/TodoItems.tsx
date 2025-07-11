import clsx from "clsx";

interface TodoItemsProps {
    todoList: { title: string; completed: boolean }[];
    setTodoCompleted: (index: number) => void;
    removeTodo: (index: number) => void;
}

function TodoItems({ todoList, setTodoCompleted, removeTodo }: TodoItemsProps) {
    return (
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
                            checked={item.completed}
                            onChange={() => {
                                setTodoCompleted(index);
                            }}
                        />
                        <span className="relative inline-block size-[26px] border border-solid border-[#6C63FF] rounded-[2px] peer-checked:bg-[#6C63FF] text-[#F7F7F7] dark:text-[#252525] dark:peer-checked:text-[#F7F7F7] cursor-pointer">
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
                        <div className="ml-auto flex items-center gap-[10px]">
                            <button>
                                <img src="./assets/icons/edit.svg" alt="" />
                            </button>
                            <button
                                onClick={() => {
                                    removeTodo(index);
                                }}
                            >
                                <img src="./assets/icons/remove.svg" alt="" />
                            </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default TodoItems;
