import styled from "styled-components";

export const Table = styled.table`
  width: 100%;

  tbody:before {
    content: "@";
    display: block;
    line-height: 18px;
    text-indent: -99999px;
  }
  .sample-dashboard-table-header {
    height: 45px;
  }
  .sample-dashboard-table-header-row {
    width: 100%;
  }
  .id-header {
    width: 5%;
  }
  .name-header {
    width: 81%;
    text-align: left;
  }
  .like-header {
    width: 5%;
  }
  .add-header {
    width: 5%;
  }
  .options-header {
    width: 4%;
  }

  .sample-dashboard-table-body {
    width: 100%;
  }
`;
