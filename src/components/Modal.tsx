interface ModalProps {
    todo: string;
    inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addTodo: () => void;
    toggleModal: (status: boolean) => void;
}

function Modal({ todo, inputChange, addTodo, toggleModal }: ModalProps) {
    return (
        <div
            className="fixed top-0 right-0 bottom-0 left-0 flex justify-center bg-[rgba(37,37,37,0.70)]"
            onClick={() => {
                toggleModal(false);
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
                        inputChange(e);
                    }}
                />
                <div className="flex justify-between mt-[128px]">
                    <button
                        onClick={() => {
                            toggleModal(false);
                        }}
                        className="border! border-solid! border-[#6C63FF]! rounded-[5px] p-[10px_22px]! text-[#6C63FF] text-[18px] font-medium leading-none hover:shadow-[0px_0px_4px_0px_#6C63FF]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            addTodo();
                        }}
                        className="bg-[#6C63FF]! rounded-[5px] p-[10px_22px]! text-[#F7F7F7] text-[18px] font-medium leading-none hover:bg-[#5850DD]! hover:shadow-[0px_0px_4px_0px_#6C63FF]"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
