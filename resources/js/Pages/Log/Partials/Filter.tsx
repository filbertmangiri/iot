import FloatingInput from "@/Components/Form/FloatingInput";
import Modal from "@/Components/Modal";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Filter() {
    const [show, setShow] = useState(false);

    const form = useForm({
        device: "",
        serial_number: "",
        password: "",
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        form.setData({
            ...form.data,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.get(route("log.index"), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setShow(true)}
                className="rounded-md border border-transparent p-0.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
                <FunnelIcon className="h-6 w-6 stroke-2" />
            </button>

            <Modal
                title="Filter"
                openState={[show, setShow]}
                actionButton={{
                    text: "Filter",
                }}
                onFormSubmit={submitHandler}
            >
                <div className="flex flex-col gap-y-5">
                    <FloatingInput className="py-2">
                        <FloatingInput.Field
                            id="filter-device"
                            name="device"
                            value={form.data.device}
                            onChange={inputHandler}
                        />

                        <FloatingInput.Label
                            htmlFor="filter-device"
                            backgroundClassName="bg-white dark:bg-gray-900"
                        >
                            Device
                        </FloatingInput.Label>
                    </FloatingInput>

                    <FloatingInput className="py-2">
                        <FloatingInput.Field
                            id="filter-serial-number"
                            name="serial_number"
                            value={form.data.serial_number}
                            onChange={inputHandler}
                        />

                        <FloatingInput.Label
                            htmlFor="filter-serial-number"
                            backgroundClassName="bg-white dark:bg-gray-900"
                        >
                            Serial Number
                        </FloatingInput.Label>
                    </FloatingInput>

                    <FloatingInput className="py-2">
                        <FloatingInput.Field
                            id="filter-password"
                            name="password"
                            value={form.data.password}
                            onChange={inputHandler}
                        />

                        <FloatingInput.Label
                            htmlFor="filter-password"
                            backgroundClassName="bg-white dark:bg-gray-900"
                        >
                            Password
                        </FloatingInput.Label>
                    </FloatingInput>
                </div>
            </Modal>
        </>
    );
}
