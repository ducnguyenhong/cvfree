import styled from 'styled-components'

export const CVDetailStyle = styled.div`
  .div-triangle-top-right {
    transform: rotate(20deg);
  }
  .div-triangle-bottom-left {
    transform: rotate(20deg);
  }

  .metadata-root {
    .metadata-control {
      opacity: 0;
      visibility: hidden;
    }
    &:hover {
      .metadata-control {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .cv-page-2 {
    top: 1115px;
    left: -100px;
  }
  .cv-page-3 {
    top: 2230px;
    left: -100px;
  }
`
