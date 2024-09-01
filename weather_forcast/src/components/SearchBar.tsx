import React, { useState, useEffect, useRef } from 'react';
import { API_KEY } from '../constants';

interface City {
    name: string;
    country: string;
    state?: string;
}

interface SearchBarProps {
    onCitySelect: (city: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 2) {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
                    );
                    const data = await response.json();
                    setSuggestions(data);
                    setIsOpen(true);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        };

        fetchSuggestions();
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (city: City) => {
        onCitySelect(city.name);
        setQuery(city.name);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city"
                className="w-full p-2 rounded"
            />
            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(city)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;