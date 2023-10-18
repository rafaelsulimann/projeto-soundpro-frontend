import { useState } from "react";
import SearchIcon from "../Icons/Search";
import { Container } from "./styles";

type Props = {
    onSearch: any;
    searchText: string;
}

export default function SearchBar({ onSearch, searchText }: Props) {
    const [isFocused, setIsFocused] = useState(false);

    function handleSearch(event: any){
      onSearch(event);
    }
    
    function handleFocused() {
        setIsFocused(true);
      }
    
      function handleBlur() {
        setIsFocused(false);
      }
    
      const searchBarBorderColor = isFocused
    ? "1px solid var(--border-gray-color)"
    : "1px solid var(--line-gray-color)";
  return (
    <Container>
      <div
        className="search-bar-form-div"
        style={{ border: searchBarBorderColor }}
      >
        <SearchIcon fill="#999aa7" className="search-bar-icon" />
        <input
          value={searchText}
          type="text"
          placeholder="Procurar"
          onChange={handleSearch}
          onFocus={handleFocused}
          onBlur={handleBlur}
          className="search-bar-input"
        />
      </div>
    </Container>
  );
}
