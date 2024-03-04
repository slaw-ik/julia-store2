import React from 'react';
import { DataStructure, ShowActions } from './MegaTable';

interface HeaderProps {
  dataStructure: DataStructure[];
  showActions?: ShowActions;
}

const Header = ({ dataStructure, showActions }: HeaderProps) => {
  return (
    <tr>
      {dataStructure.map((data) => (
        <th key={data.key} scope="col" style={data.style || {}}>
          {data.name}
        </th>
      ))}
      {showActions && <th scope="col">Actions</th>}
    </tr>
  );
};

export default Header;
