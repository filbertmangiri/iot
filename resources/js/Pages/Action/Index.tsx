import Toggle from "@/Components/Form/Toggle";
import AppLayout from "@/Layouts/AppLayout";
import { Switch } from "@headlessui/react";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

function Index() {
    const [LED, setLED] = useState({
        first: false,
        second: false,
    });

    const [running, setRunning] = useState(false);

    return (
        <div className="flex flex-col gap-y-4">
            <button
                type="button"
                onClick={() => setRunning(!running)}
                className={twMerge(
                    "w-fit rounded-lg p-4 text-white shadow-md transition-all focus:ring-2",
                    running
                        ? "bg-red-500 hover:bg-red-600 focus:ring-red-700"
                        : "bg-green-500 hover:bg-green-600 focus:ring-green-700"
                )}
            >
                {running ? (
                    <PauseIcon className="h-5 w-5" />
                ) : (
                    <PlayIcon className="h-5 w-5" />
                )}
            </button>

            <div className="bg-white shadow sm:rounded-lg">
                <Switch.Group as="div" className="px-4 py-5 sm:p-6">
                    <Switch.Label
                        as="h3"
                        className="text-lg font-medium leading-6"
                        passive
                    >
                        LED 01
                    </Switch.Label>
                    <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                        <div className="max-w-xl text-sm text-gray-500">
                            <Switch.Description>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Explicabo totam non cumque
                                deserunt officiis ex maiores nostrum.
                            </Switch.Description>
                        </div>
                        <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                            <Toggle
                                enabled={LED.first}
                                setEnabled={(enabled) =>
                                    setLED({
                                        ...LED,
                                        first: enabled,
                                    })
                                }
                            />
                        </div>
                    </div>
                </Switch.Group>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <Switch.Group as="div" className="px-4 py-5 sm:p-6">
                    <Switch.Label
                        as="h3"
                        className="text-lg font-medium leading-6"
                        passive
                    >
                        LED 02
                    </Switch.Label>
                    <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                        <div className="max-w-xl text-sm text-gray-500">
                            <Switch.Description>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Explicabo totam non cumque
                                deserunt officiis ex maiores nostrum.
                            </Switch.Description>
                        </div>
                        <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                            <Toggle
                                enabled={LED.second}
                                setEnabled={(enabled) =>
                                    setLED({
                                        ...LED,
                                        second: enabled,
                                    })
                                }
                            />
                        </div>
                    </div>
                </Switch.Group>
            </div>
        </div>
    );
}

Index.layout = (page: ReactNode) => (
    <AppLayout children={page} header="Actions" />
);

export default Index;
