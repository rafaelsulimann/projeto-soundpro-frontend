import { useState } from "react";
import SearchIcon from "../Icons/Search";
import { Container, SearchBarDiv, SearchBarInputText } from "./styles";

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
      <SearchBarDiv
        style={{ border: searchBarBorderColor }}
      >
        <SearchIcon fill="#999aa7" className="search-bar-icon" />
        <SearchBarInputText
          value={searchText}
          type="text"
          placeholder="Procurar"
          onChange={handleSearch}
          onFocus={handleFocused}
          onBlur={handleBlur}
        />
      </SearchBarDiv>
    </Container>
  );
}
