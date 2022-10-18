import React from "react";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { ResultSearch } from "./result-search";
import { UseResultSearch } from "hooks";
import { VscLoading } from "react-icons/vsc";

import "./style.css";
interface SearchProps {
    setOpen: (e: any) => void;
    open: boolean;
    className?: string;
}

export const Search = ({ setOpen, open, className }: SearchProps) => {
    const { onChangeSearch, resultSearch, search, clear } = UseResultSearch();
    const { data, loading } = resultSearch;

    const openSearch = React.useCallback(() => setOpen(true), [setOpen]);

    return (
        <>
            <div
                className={clsx(
                    "group-search loading flex relative w-full bg-[#3e3f44] rounded p-[10px]",
                    open && "active",
                    className
                )}
            >
                {/* display:block <= max-width: 700px */}
                <div
                    className="group-search__icon group-search__icon_block cursor-pointer flex items-center p-2 relative border border-[#3e3f44] rounded"
                    onClick={openSearch}
                >
                    <BsSearch className="text-white" size="1.2em" />
                </div>
                {/* display:node <= max-width: 700px */}
                <div className="relative z-20 flex items-center pr-2 cursor-pointer group-search__icon group-search__icon_node">
                    <BsSearch className="text-white" size="1.2em" />
                </div>
                {/*  */}
                <input
                    onChange={onChangeSearch}
                    placeholder="Nhập tên bài hát, ca sĩ, thể loại..."
                    type="text"
                    value={search}
                    className="w-full text-white bg-transparent group-search__input autofocus focus:outline-none"
                />
                {search && !loading && (
                    <MdClose
                        className="self-center mr-2 text-white cursor-pointer group-search__icon_node"
                        size="1.5em"
                        onClick={clear}
                    />
                )}
                {search && data && <ResultSearch data={data} className={clsx(open && "p-2")} />}
                {loading && <VscLoading className="self-center mr-2 text-white animate-spin" size="1.5em" />}
            </div>
        </>
    );
};
