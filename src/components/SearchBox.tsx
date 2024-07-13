import React, { FC, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { RxCross2 } from "react-icons/rx";


interface SearchBoxProps {
    onSearch: (a: any) => void;
}
const SearchBox: FC<SearchBoxProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, 1000);

    // Fetch search results whenever the debounced search term changes
    React.useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };
    const clearSearchHandler = () => {
        setInputValue("")
    }

    return (
        <div className="position-relative">
            <input
                className='form-control'
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Search for Users & Groups"
            />
            {inputValue ? <RxCross2 className='position-absolute search_clear_btn' size={24} onClick={clearSearchHandler} /> : <></>}

        </div>
    );
};

export default SearchBox;
