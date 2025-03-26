import { useState } from "react";
import { Book } from "../../type/interface";

interface SearcherProps {
    onSearch: (type: keyof Book, keyword: string) => void;
}

const Search: React.FC<SearcherProps> = ({ onSearch }) => {
    const [key, setKey] = useState<keyof Book>('title');
    const [value, setValue] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(key, value);
    }

    return (
        <div className="mt-2 w-fit">
            <form className="max-w-md" onSubmit={handleSearch}>
                <div className="border flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <select
                        className="border-r w-fit col-start-1 row-start-1 appearance-none rounded-l-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        value={key} onChange={(e) => setKey(e.target.value as keyof Book)}>
                        <option value="title">제목</option>
                        <option value="author">저자</option>
                        <option value="stock">재고</option>
                    </select>
                    <input className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" type="text" placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button className="h-9 border-l px-1 hover:bg-gray-300" type="submit">Search</button>
                </div>
            </form>
        </div>
    );
}

export default Search;