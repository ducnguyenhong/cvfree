import styled from 'styled-components'

export const MetaDataStyle = styled.div`
  .metadata-root {
    border: 1px solid transparent;
    .metadata-control {
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
    }
    transition: 0.3s;
    &:hover {
      border: 1px dashed #e1e1e1 !important;
      .metadata-control {
        transition: 0.3s;
        opacity: 1;
        visibility: visible;
      }
    }
  }
`
