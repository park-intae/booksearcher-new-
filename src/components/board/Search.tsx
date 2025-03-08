import { useState } from "react";

interface SearcherProps {
    search: (type: string, keyword: string) => void;
}

const Searcher: React.FC<SearcherProps> = (onSearch) => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch.search(key, value);
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <select value={key} onChange={(e) => setKey(e.target.value)}>
                    <option value="title">제목</option>
                    <option value="author">저자</option>
                    <option value="isbn">재고고</option>
                </select>
                <input type="text" placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Searcher;