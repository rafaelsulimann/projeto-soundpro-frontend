import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  th {
    border-bottom: 1px solid #8382892c;
  }

  td {
    padding: 10px 0px;
  }
`;

export const TableHeader = styled.thead`
  height: 45px;
`;

export const TableHeaderRow = styled.tr`
  width: 100%;
`;

export const ColumnTitle = styled.h4``;

export const Id = styled.th`
  width: 5%;
`;

export const Name = styled.th`
  width: 81%;
  text-align: left;
`;

export const Liked = styled.th`
  width: 5%;
`;

export const Add = styled.th`
  width: 5%;
`;

export const Options = styled.th`
  width: 4%;
`;

export const TableBody = styled.tbody`
  width: 100%;

  &:before {
    content: "@";
    display: block;
    line-height: 18px;
    text-indent: -99999px;
  }
`;
