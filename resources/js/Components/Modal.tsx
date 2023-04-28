import { Dialog, Transition } from "@headlessui/react";
import {
    ComponentProps,
    Dispatch,
    FormEvent,
    Fragment,
    ReactNode,
    SetStateAction,
    useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    openState: [boolean, Dispatch<SetStateAction<boolean>>];
    title?: string;
    children: ReactNode;
    withCancel?: boolean;
    actionButton?: {
        text: string;
        onClick?: () => void;
    } & ComponentProps<"button">;
    onFormSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Modal({
    openState,
    title,
    children,
    withCancel = true,
    actionButton,
    onFormSubmit,
}: Props) {
    const [open, setOpen] = openState;

    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                as={onFormSubmit ? "form" : "div"}
                                onSubmit={onFormSubmit}
                                className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>

                                    <div className="mt-8">{children}</div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {actionButton && (
                                        <button
                                            type={
                                                onFormSubmit
                                                    ? "submit"
                                                    : "button"
                                            }
                                            className={twMerge(
                                                "inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto",
                                                actionButton.className
                                            )}
                                            onClick={() => {
                                                actionButton.onClick?.();
                                                setOpen(false);
                                            }}
                                        >
                                            {actionButton.text}
                                        </button>
                                    )}

                                    {withCancel && (
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
