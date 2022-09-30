import { useState } from "react";
import { SearchInterface } from "src/components/search/interface";
import { UserDBInterface } from "src/interfaces/user.interface";
import "./search.scss";

export const Search = ({ users, onListUser }: SearchInterface): JSX.Element => {
  const [name, setName] = useState<string>("");

  const onHandlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    onSearchUser(text);
    setName(text);
  };

  const onSearchUser = (text: string) => {
    const searchUsers: UserDBInterface[] = users.filter((u) =>
      u.username.toLowerCase().startsWith(text.toLowerCase())
    );
    if (searchUsers.length > 0) {
      onListUser(searchUsers);
    } else {
      onListUser(users);
    }
  };

  return (
    <div className="search-chat-user">
      <input
        type="text"
        value={name}
        placeholder="Search user..."
        onChange={onHandlerChange}
      />
    </div>
  );
};

export default Search;
