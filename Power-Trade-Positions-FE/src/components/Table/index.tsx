import React from 'react';

interface TableProps {
  children: React.ReactNode
  classNameExtension?: string
}

const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        {children}
      </table>
    </div>
  );
};

const Head = ({ children }: TableProps) => {
  return (
    <thead className="bg-gray-100 border-b">
      <tr>{children}</tr>
    </thead>
  );
};

const Body = ({ children }: TableProps) => {
  return <tbody>{children}</tbody>;
};

interface RowProps extends TableProps {
  onRowSelected?: () => void
}

const Row = ({ children, onRowSelected }: RowProps) => {
  return <tr onClick={onRowSelected} className={`hover:bg-gray-50 border-b border-gray-200 ${onRowSelected ? 'cursor-pointer' : ''}`}>{children}</tr>;
};

const Header = ({ children, classNameExtension }: TableProps) => {
  return (
    <th className={`py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 ${classNameExtension ? classNameExtension : ''}`}>
      {children}
    </th>
  );
};

const Cell = ({ children, classNameExtension }: TableProps) => {
  return <td className={`py-3 px-6 text-sm text-gray-700 border-r border-gray-200 ${classNameExtension ? classNameExtension : ''}`}>{children}</td>;
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Header = Header;
Table.Cell = Cell;

export default Table;