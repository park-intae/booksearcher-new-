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
        <div>
            <form onSubmit={handleSearch}>
                <select value={key} onChange={(e) => setKey(e.target.value as keyof Book)}>
                    <option value="title">제목</option>
                    <option value="author">저자</option>
                    <option value="stock">재고</option>
                </select>
                <input type="text" placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search;